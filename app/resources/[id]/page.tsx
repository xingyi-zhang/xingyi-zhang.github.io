import { notFound } from "next/navigation";
import { resourceItems } from "../../data";

export function generateStaticParams() { return resourceItems.map((item) => ({ id: item.id })); }

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = resourceItems.find((resource) => resource.id === id);
  if (!item) return notFound();
  return <main className="resource-detail"><a className="back-link" href="/resources">← Resources</a><div className="page-heading"><p className="eyebrow">{item.labels.join(" · ")}</p><h1>{item.title}</h1><p>{item.introduction ?? item.description}</p></div>{item.items && item.items.length > 0 && <div className="resource-index"><p className="eyebrow">On this shelf</p>{item.items.map((entry) => <div className="resource-row" key={entry}><h2>{entry}</h2><span>Forthcoming</span></div>)}</div>}</main>;
}
