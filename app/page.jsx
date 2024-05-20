import { Suspense } from "react";

export default function Page() {
	return (
		<>
			<h1>Hello server components !!</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Images />
			</Suspense>
		</>
	);
}

async function Images() {
	await new Promise((resolve) => setTimeout(resolve, 5000));

	return (
		<ul>
			<li>Salut@</li>
			<li>Test</li>
			<li>Cocuocu</li>
			<li>Helloooo</li>
			<li>Hihihihihih</li>
			<li>Prrrrrrr</li>
		</ul>
	);
}
