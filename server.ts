import { createElement } from "react";
import { renderToString } from "react-dom/server";
// @ts-expect-error no typescript types
import * as ReactServerDom from "react-server-dom-webpack/server.browser";

const APP_DIR = new URL("app/", import.meta.url);
const BUILD_DIR = new URL("build/", import.meta.url);

function resolveApp(path: string) {
	return new URL(path, APP_DIR).pathname;
}

function resolveBuild(path = "") {
	return new URL(path, BUILD_DIR).pathname;
}

// we build when we launch the server
await build();

Bun.serve({
	port: 8200,
	fetch: async (req) => {

		// match /build/*
		if (req.url.match(/\/build\/.+/)) {
      // we serve files we don't want to be imported / processed by the server
			const staticNameFile = req.url.split("/").pop();
			return new Response(await serveStaticFile(staticNameFile), { headers: { "content-type": "text/javascript" } });
		}

		// we get the module page.js from the build directory (which is the react component builded for the web)
		const page = await import(resolveBuild("page.js"));

		// we create a react element from the default export of the page module
		const component = createElement(page.default);

		// we convert the react element into a html string
		const html = renderToString(component);

		// we create a stream from the react element
		const stream = ReactServerDom.renderToReadableStream(component);

		if (req.url.endsWith("/client")) return new Response(html, { headers: { "content-type": "text/html" } });

		// we send the string as a HTML response to the client
		if (req.url.endsWith("/"))
			return new Response(await Bun.file('./index.html').text(),
				{ headers: { "content-type": "text/html" } }
			);

		// if we send a stream, Response handle it as a stream
		if (req.url.endsWith("/rsc")) return new Response(stream);

		return new Response("Not found", { status: 404, statusText: "Not found" });
	},
});

async function build() {
	const rscBuild = await Bun.build({
		entrypoints: [resolveApp("page.jsx")],
		outdir: resolveBuild(),
		format: "esm",
		// if we don't want the whole react ecosystem to be included in the bundle
		external: ["react"],
		// sourcemap: "external",
	});

	if (!rscBuild.success) console.error(rscBuild.logs[0]);

	const clientBuild = await Bun.build({
		entrypoints: [resolveApp("_client.jsx")],
		outdir: resolveBuild(),
		format: "esm",
		splitting: true,
		// we need the react ecosystem for the browser !
	});

	if (!clientBuild.success) console.error(clientBuild.logs[0]);
}

function serveStaticFile(path = "") {
	const file = Bun.file(new URL(path, BUILD_DIR).pathname);
	return file.text();
}

console.log('Server running at http://localhost:8200');