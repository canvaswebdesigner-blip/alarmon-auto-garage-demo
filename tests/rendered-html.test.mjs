import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Alarmon landing page with critical sales and contact content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Alarmon Auto Garage \| PPF, Cam Filmi ve Araç Bakımı<\/title>/i);
  assert.match(html, /Boyayı değil/);
  assert.match(html, /Aracına göre teklif al/);
  assert.match(html, /905387301332/);
  assert.match(html, /Çalıkuşu Mahallesi/);
  assert.match(html, /4,9/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});

test("renders the custom 404 page", async () => {
  const response = await render("/burada-yok");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /ARADIĞIN SAYFA BURADA DEĞİL/);
  assert.match(html, /Garaja dönelim/i);
});
