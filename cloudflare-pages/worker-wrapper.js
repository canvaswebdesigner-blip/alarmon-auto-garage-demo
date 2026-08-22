import app from "./worker/index.js";

const staticPrefixes = ["/assets/", "/images/"];
const staticFiles = new Set([
  "/favicon.svg",
  "/file.svg",
  "/globe.svg",
  "/window.svg",
]);

const worker = {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);

    if (
      staticPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
      staticFiles.has(pathname)
    ) {
      return env.ASSETS.fetch(request);
    }

    return app.fetch(request, env, context);
  },
};

export default worker;
