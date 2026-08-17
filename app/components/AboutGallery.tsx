"use client";

import { useRef } from "react";
import type { CatalogItem } from "../data";

function destinationFor(item: CatalogItem) {
  if (item.links?.[0]?.url) return item.links[0].url;
  if (item.details || item.gallery?.length) return item.section === "resources" ? `/resources/${item.id}` : `/project/${item.id}`;
}

export function AboutGallery({ items }: { items: CatalogItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => track.current?.scrollBy({ left: direction * Math.min(window.innerWidth * .7, 620), behavior: "smooth" });

  return <section className="about-gallery" aria-labelledby="selected-heading">
    <div className="about-gallery-heading">
      <div><p className="eyebrow">Selected from the collection</p><h2 id="selected-heading">A few things I’ve kept.</h2></div>
      <div className="gallery-controls" aria-label="Gallery controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous works">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Next works">→</button>
      </div>
    </div>
    <div className="about-gallery-track" ref={track} tabIndex={0}>
      {items.map((item) => {
        const destination = destinationFor(item);
        const content = <>{item.image ? <div className="about-gallery-image"><img src={item.image} alt="" /></div> : <div className="about-gallery-placeholder"><span>{item.section}</span></div>}<div className="about-gallery-meta"><h3>{item.title}</h3><p>{item.labels.join(" · ")}</p><span>{item.date}</span></div></>;
        return destination ? <a className="about-gallery-card" href={destination} target={item.links?.[0]?.url ? "_blank" : undefined} rel={item.links?.[0]?.url ? "noreferrer" : undefined} key={item.id}>{content}</a> : <article className="about-gallery-card" key={item.id}>{content}</article>;
      })}
    </div>
  </section>;
}
