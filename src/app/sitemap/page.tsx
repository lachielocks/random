import Link from "next/link";
import { tools } from "@/lib/tools";

export default function SitemapPage() {
  const fakePages = [
    "/admin", "/login", "/secret-vault", "/cheese-database",
    "/duck-hq", "/classified", "/mainframe", "/bread-recipes",
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Sitemap</h1>
      <p className="text-gray-500 mb-8 text-sm">Official site map. Completely accurate. Trust us.</p>

      <section className="mb-10">
        <h2 className="font-bold text-gray-700 mb-3 uppercase text-xs tracking-widest">Public Tools</h2>
        <ul className="space-y-1">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="text-blue-600 hover:underline text-sm">{t.href}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-gray-700 mb-3 uppercase text-xs tracking-widest">Other Pages (Definitely Real)</h2>
        <ul className="space-y-1">
          {fakePages.map((p) => (
            <li key={p} className="text-gray-400 text-sm line-through">{p}</li>
          ))}
        </ul>
        <p className="text-xs text-gray-300 mt-2 italic">These pages do not exist. Or do they?</p>
      </section>

      <section>
        <h2 className="font-bold text-gray-700 mb-3 uppercase text-xs tracking-widest">Hidden Pages</h2>
        <p className="text-gray-400 text-sm italic">[REDACTED]</p>
        <p className="text-gray-300 text-xs mt-2">(there are none. stop looking.)</p>
      </section>

      <Link href="/" className="inline-block mt-12 text-sm text-gray-500 hover:text-gray-800">← Back</Link>
    </main>
  );
}
