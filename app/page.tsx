import { ProjectGrid } from "./components";
import { projects } from "./data";

export default function Home() { return <main><section className="intro"><h1>Welcome to my collection.</h1><p>Selected research, games, and handmade things.</p></section><section className="featured"><div className="section-title"><p>Selected works</p><p>{projects.filter((p) => p.featured).length} objects on view</p></div><ProjectGrid items={projects.filter((p) => p.featured)} /><div className="more"><a href="/work">Research collection</a><a href="/creative">Creative collection</a></div></section></main>; }
