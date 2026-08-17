"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CatalogItem } from "../data";

function Artwork({ item, large = false }: { item: CatalogItem; large?: boolean }) {
  return <div className={`artwork has-image ${large ? "large" : ""}`}><img src={item.image} alt={item.title} /></div>;
}

function internalUrl(item: CatalogItem) {
  return item.section === "resources" ? `/resources/${item.id}` : `/project/${item.id}`;
}

export function CatalogCard({ item }: { item: CatalogItem }) {
  const cell = useRef<HTMLDivElement>(null);
  const [rowSpan, setRowSpan] = useState(1);
  useLayoutEffect(() => {
    const element = cell.current;
    if (!element) return;
    const measure = () => setRowSpan(Math.ceil(element.getBoundingClientRect().height / 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const textOnly = !item.image;
  const destination = item.links?.[0]?.url ?? (item.details || item.gallery?.length ? internalUrl(item) : undefined);
  const external = Boolean(item.links?.[0]?.url);
  const content = <>{item.image && <Artwork item={item} />}<div className={`card-meta ${textOnly ? "text-only" : ""}`}><h2>{item.title}</h2>{textOnly && item.description && <p className="card-description">{item.description}</p>}<p>{item.labels.join(" · ")} <em>{item.date}</em></p></div></>;

  const cardKind = textOnly ? "text-card" : "image-card";
  const card = destination ? <a className={`project-card is-linked ${cardKind}`} href={destination} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={`${item.title} — open project`}>{content}</a> : <article className={`project-card is-static ${cardKind}`}>{content}</article>;
  return <div className="project-card-cell" ref={cell} style={{ gridRowEnd: `span ${rowSpan}` }}>{card}</div>;
}

export function CatalogGrid({ items }: { items: CatalogItem[] }) {
  return <div className="project-grid">{items.map((item) => <CatalogCard item={item} key={item.id} />)}</div>;
}

type CollectionProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  items: CatalogItem[];
  filters: string[];
  initialFilter: string;
  filterLabel: string;
  secondaryOptions: string[];
  secondaryFilterLabel: string;
  primaryField: "topics" | "practice";
  secondaryField: "outputs" | "materials";
};

export function Collection({ title, subtitle, eyebrow, items, filters, initialFilter, filterLabel, secondaryOptions, secondaryFilterLabel, primaryField, secondaryField }: CollectionProps) {
  const [active, setActive] = useState(initialFilter);
  const [secondary, setSecondary] = useState<string[]>([]);
  const toggleSecondary = (option: string) => setSecondary((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const valuesFor = (item: CatalogItem, field: CollectionProps["primaryField"] | CollectionProps["secondaryField"]): string[] => {
    if (field === "practice") return "practice" in item ? [item.practice] : [];
    if (field === "materials") return "materials" in item ? item.materials : [];
    if (field === "topics") return "topics" in item ? item.topics : [];
    return "outputs" in item ? item.outputs : [];
  };
  const visible = items.filter((item) => valuesFor(item, primaryField).includes(active) && (secondary.length === 0 || secondary.some((option) => valuesFor(item, secondaryField).includes(option))));
  const secondaryLabel = secondary.length === 0 ? `All ${secondaryFilterLabel}` : secondary.length === 1 ? secondary[0] : `${secondary.length} ${secondaryFilterLabel}`;

  return <main><div className="page-heading collection-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div><div className="catalog-controls"><div className="filter-scroll"><span className="filter-label">{filterLabel}</span><div className="filters" role="group" aria-label={`Filter ${title}`}>{filters.map((filter) => <button aria-pressed={active === filter} onClick={() => setActive(filter)} key={filter}>{filter}</button>)}</div></div><details className="multi-select"><summary>{secondaryLabel}<span aria-hidden>⌄</span></summary><div className="multi-menu" role="group" aria-label={`Filter by ${secondaryFilterLabel.toLowerCase()}`}>{secondaryOptions.map((option) => <label key={option}><input type="checkbox" checked={secondary.includes(option)} onChange={() => toggleSecondary(option)} /><span>{option}</span></label>)}<button type="button" onClick={() => setSecondary([])} disabled={secondary.length === 0}>Clear selections</button></div></details></div><CatalogGrid items={visible} /></main>;
}

export { Artwork };
