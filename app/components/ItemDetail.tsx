"use client";

import { useEffect, useState } from "react";
import type { CatalogItem } from "../data";
import { Artwork } from "./Catalog";

export function ItemDetail({ item }: { item: CatalogItem }) {
  const [lightbox, setLightbox] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const gallery = item.gallery ?? [];
  const writingSections = item.section === "creative" ? item.writingSections : undefined;

  return <main className="detail">
    {item.image && <button className="hero-button" onClick={() => setLightbox(true)} aria-label={`Enlarge ${item.title} image`}>
      <Artwork item={item} large />
    </button>}

    <div className="detail-copy">
      <div><p className="eyebrow">{item.section}</p><h1>{item.title}</h1></div>
      <div>
        <p>{item.labels.join(" · ")} · {item.date}</p>
        {item.description && <p className="description">{item.description}</p>}
        <div className="links">{item.links?.map((link) => <a href={link.url} key={link.label}>{link.label} ↗</a>)}</div>
      </div>
    </div>

    {writingSections && <article className="writing-piece">
      {writingSections.map((section) => <section className="writing-section" key={section.title}>
        <h2>{section.title}</h2>
        <div className="writing-paragraphs">{section.entries.map((entry) => <p className="writing-entry" key={`${entry.label ?? ""}-${entry.text}`}>
          {entry.label && <strong>{entry.label}</strong>}
          {entry.label && ": "}{entry.text}
        </p>)}</div>
      </section>)}
    </article>}

    {gallery.length > 0 && <section className="gallery">
      <p className="eyebrow">Gallery</p>
      {gallery.map((image) => <div className="gallery-image" key={image}><img src={image} alt={`${item.title} study`} /></div>)}
    </section>}

    {lightbox && item.image && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} image viewer`} onClick={() => setLightbox(false)}>
      <button className="close" onClick={() => setLightbox(false)}>Close ×</button>
      <div onClick={(event) => event.stopPropagation()}><Artwork item={item} large /></div>
    </div>}
  </main>;
}
