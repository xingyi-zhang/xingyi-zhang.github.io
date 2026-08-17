import { notFound } from "next/navigation";
import { resourceItems } from "../../data";

export function generateStaticParams() {
  return resourceItems.map((item) => ({ id: item.id }));
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = resourceItems.find((resource) => resource.id === id);
  if (!item) return notFound();

  return <main className="resource-detail">
    <a className="back-link" href="/resources">← Resources</a>
    <div className="page-heading">
      <p className="eyebrow">{item.labels.join(" · ")}</p>
      <h1>{item.title}</h1>
      <p>{item.introduction ?? item.description}</p>
    </div>

    {(item.contentNote || item.introParagraphs) && <section className="resource-lede">
      {item.contentNote && <p className="content-note">{item.contentNote}</p>}
      {item.introParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>}

    {item.guideSections && <div className="resource-guide">
      {item.guideSections.map((section) => <section className="guide-section" key={section.title}>
        <h2>{section.title}</h2>
        <div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>)}
    </div>}

    {item.groups?.map((group) => <section className="resource-group" key={group.title}>
      <h2>{group.title}</h2>
      <ul>{group.entries.map((entry) => <li className={`resource-entry ${entry.workbook ? "is-workbook" : ""}`} key={`${entry.title}-${entry.creator ?? ""}`}>
        <div>
          <h3>{entry.title}{entry.stars && <span className="entry-stars" aria-label={`${entry.stars} personal favorite star${entry.stars > 1 ? "s" : ""}`}>{"★".repeat(entry.stars)}</span>}</h3>
          {(entry.creator || entry.year || entry.workbook) && <p className="entry-byline">{entry.creator}{entry.creator && entry.year && " · "}{entry.year}{entry.workbook && <span className="workbook-mark">Workbook</span>}</p>}
        </div>
        {entry.note && <p>{entry.note}</p>}
      </li>)}</ul>
    </section>)}

    {item.items && item.items.length > 0 && <div className="resource-index">
      <p className="eyebrow">On this shelf</p>
      {item.items.map((entry) => <div className="resource-row" key={entry}>
        <h2>{entry}</h2><span>Forthcoming</span>
      </div>)}
    </div>}

    {item.links && item.links.length > 0 && <aside className="resource-sources">
      <p className="eyebrow">Useful references</p>
      {item.links.map((link) => <a href={link.url} key={link.label} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
    </aside>}
  </main>;
}
