"use client";

import { useState } from "react";

const navigation = [
  ["Research", "/research"],
  ["Creative", "/creative"],
  ["Resources", "/resources"],
  ["About", "/about"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><a className="name" href="/">Home</a><button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button><nav className={open ? "open" : ""} aria-label="Primary navigation">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>;
}
