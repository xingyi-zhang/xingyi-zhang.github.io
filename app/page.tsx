import { CatalogGrid } from "./components";
import { creativeItems, researchItems } from "./data";

const featuredItems = [...researchItems, ...creativeItems].filter((item) => item.featured);

export default function Home() { return <main><section className="intro"><h1>Welcome to my collection.</h1><p>Things I’ve studied, made, noticed, and kept.</p></section><section className="featured"><div className="section-title"><p>Selected works</p><p>{featuredItems.length} objects on view</p></div><CatalogGrid items={featuredItems} /><div className="more"><a href="/research">Research collection</a><a href="/creative">Creative collection</a></div></section></main>; }
