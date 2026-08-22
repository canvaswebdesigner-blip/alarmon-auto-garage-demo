import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-mark">404</div>
      <p>ARADIĞIN SAYFA BURADA DEĞİL</p>
      <h1>Yol bitti.<br /><em>Garaja dönelim.</em></h1>
      <Link className="button button-primary" href="/">Ana sayfaya dön →</Link>
    </main>
  );
}
