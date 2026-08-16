import { Collection } from "../components";
import { projects } from "../data";
export default function Creative() { return <Collection title="Creative" subtitle="Designed, written, stitched, drawn, and occasionally inexplicable." items={projects.filter((p) => p.section === "creative")} tags={["Design", "Crochet", "Weaving", "Drawing", "Ceramics", "Sculpture", "Writing"]} initialTag="Design" filterLabel="Practice" formatOptions={["Yarn", "Fiber", "Paper", "Clay", "Digital"]} secondaryFilterLabel="Materials" />; }
