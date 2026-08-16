"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project } from "./data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><a className="name" href="/">Home</a><button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button><nav className={open ? "open" : ""} aria-label="Primary navigation">{[["Research","/work"],["Creative","/creative"],["Resources","/resources"],["About","/about"]].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}

export function Artwork({ project, large = false }: { project: Project; large?: boolean }) {
  const style = { "--c1": project.palette[0], "--c2": project.palette[1], "--c3": project.palette[2] } as React.CSSProperties;
  return <div className={`artwork ${project.image ? "has-image" : "empty"} ${project.shape} ${large ? "large" : ""}`} style={style} role={project.image ? undefined : "img"} aria-label={project.image ? undefined : `Image placeholder for ${project.title}`}>{project.image && <img src={project.image} alt={project.title} />}</div>;
}

export function ProjectCard({ project }: { project: Project }) {
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
  const textOnly = project.tags.includes("Writing");
  const content = <>{!textOnly && <Artwork project={project} />}<div className={`card-meta ${textOnly ? "text-only" : ""}`}><h2>{project.title}</h2>{textOnly && project.shortDescription && <p className="card-description">{project.shortDescription}</p>}<p>{project.categories.join(" · ")} <em>{project.year}</em></p></div></>;
  const destination = project.links[0]?.url;
  const card = destination
    ? <a className="project-card is-linked" href={destination} target="_blank" rel="noreferrer" aria-label={`${project.title} — open project`}>{content}</a>
    : <article className="project-card is-static">{content}</article>;
  return <div className="project-card-cell" ref={cell} style={{ gridRowEnd: `span ${rowSpan}` }}>{card}</div>;
}

export function ProjectGrid({ items }: { items: Project[] }) { return <div className="project-grid">{items.map((p) => <ProjectCard project={p} key={p.id} />)}</div>; }

export function Collection({ title, subtitle, items, tags, initialTag = "All", filterLabel = "Topics", formatOptions = [], secondaryFilterLabel = "Outputs" }: { title: string; subtitle: string; items: Project[]; tags: string[]; initialTag?: string; filterLabel?: string; formatOptions?: string[]; secondaryFilterLabel?: string }) {
  const [active, setActive] = useState(initialTag);
  const [formats, setFormats] = useState<string[]>([]);
  const toggleFormat = (option: string) => setFormats((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  const visible = items.filter((p) => (active === "All" || p.tags.includes(active)) && (formats.length === 0 || formats.some((format) => p.tags.includes(format))));
  const formatLabel = formats.length === 0 ? `All ${secondaryFilterLabel}` : formats.length === 1 ? formats[0] : `${formats.length} ${secondaryFilterLabel}`;
  return <main><div className="page-heading collection-heading"><h1>{title}</h1><p>{subtitle}</p></div><div className="catalog-controls"><div className="filter-scroll"><span className="filter-label">{filterLabel}</span><div className="filters" role="group" aria-label={`Filter ${title}`}>{tags.map((tag) => <button aria-pressed={active === tag} onClick={() => setActive(tag)} key={tag}>{tag}</button>)}</div></div>{formatOptions.length > 0 && <details className="multi-select"><summary>{formatLabel}<span aria-hidden>⌄</span></summary><div className="multi-menu" role="group" aria-label={`Filter by ${secondaryFilterLabel.toLowerCase()}`}>{formatOptions.map((option) => <label key={option}><input type="checkbox" checked={formats.includes(option)} onChange={() => toggleFormat(option)} /><span>{option}</span></label>)}<button type="button" onClick={() => setFormats([])} disabled={formats.length === 0}>Clear selections</button></div></details>}</div><ProjectGrid items={visible} /></main>;
}

export function ProjectDetail({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState(false);
  useEffect(() => { const close = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const gallery = project.gallery ?? [];
  return <main className="detail"><button className="hero-button" onClick={() => setLightbox(true)} aria-label={`Enlarge ${project.title} image`}><Artwork project={project} large /></button><div className="detail-copy"><div><p className="eyebrow">{project.section}</p><h1>{project.title}</h1></div><div><p>{project.categories.join(" · ")} · {project.year}</p>{project.shortDescription && <p className="description">{project.shortDescription}</p>}<div className="links">{project.links.map((link) => <a href={link.url} key={link.label}>{link.label} ↗</a>)}</div></div></div>{gallery.length > 0 && <section className="gallery"><p className="eyebrow">Gallery</p>{gallery.map((image) => <div className="gallery-image" key={image}><img src={image} alt={`${project.title} study`} /></div>)}</section>}{lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} image viewer`} onClick={() => setLightbox(false)}><button className="close" onClick={() => setLightbox(false)}>Close ×</button><div onClick={(e) => e.stopPropagation()}><Artwork project={project} large /></div></div>}</main>;
}
