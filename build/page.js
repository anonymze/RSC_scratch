// app/page.jsx
import {Suspense} from "react";
async function Images() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return jsxDEV("ul", {
    children: [
      jsxDEV("li", {
        children: "Salut@"
      }, undefined, false, undefined, this),
      jsxDEV("li", {
        children: "Test"
      }, undefined, false, undefined, this),
      jsxDEV("li", {
        children: "Cocuocu"
      }, undefined, false, undefined, this),
      jsxDEV("li", {
        children: "Helloooo"
      }, undefined, false, undefined, this),
      jsxDEV("li", {
        children: "Hihihihihih"
      }, undefined, false, undefined, this),
      jsxDEV("li", {
        children: "Prrrrrrr"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
import {
jsxDEV,
Fragment
} from "react/jsx-dev-runtime";
function Page() {
  return jsxDEV(Fragment, {
    children: [
      jsxDEV("h1", {
        children: "Hello server components !!"
      }, undefined, false, undefined, this),
      jsxDEV(Suspense, {
        fallback: jsxDEV("div", {
          children: "Loading..."
        }, undefined, false, undefined, this),
        children: jsxDEV(Images, {}, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  Page as default
};
