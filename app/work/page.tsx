import { Collection } from "../components";
import { projects } from "../data";
export default function Work() { return <Collection title="Research" subtitle="Questions explored through graph theory, perception, neuroscience, and open science." items={projects.filter((p) => p.section === "work")} tags={["Open Science", "Graph Theory", "Perception", "Neuroscience"]} initialTag="Open Science" filterLabel="Topics" formatOptions={["Publication", "Conference"]} />; }
