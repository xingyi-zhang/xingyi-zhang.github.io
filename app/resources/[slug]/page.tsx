import { notFound } from "next/navigation";
import { resourceCollections } from "../data";

export function generateStaticParams() { return resourceCollections.map((item) => ({ slug: item.slug })); }

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = resourceCollections.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return <main className="resource-detail"><a className="back-link" href="/resources">← Resources</a><div className="page-heading"><p className="eyebrow">{item.kind} · {item.language}</p><h1>{item.title}</h1><p>{item.introduction}</p></div><div className="resource-index"><p className="eyebrow">On this shelf</p>{item.items.map((entry, index) => <div className="resource-row" key={entry}><span>0{index + 1}</span><h2>{entry}</h2><span>Forthcoming</span></div>)}</div></main>;
}
