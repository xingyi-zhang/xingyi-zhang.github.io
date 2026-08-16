import { Collection } from "../components";
import { researchFilters, researchItems } from "../data";

export default function Research() { return <Collection title="Research" subtitle="Questions explored through graph theory, perception, neuroscience, and open science." items={researchItems} filters={researchFilters.topics} initialFilter="Open Science" filterLabel="Topics" secondaryOptions={researchFilters.outputs} secondaryFilterLabel="Outputs" primaryField="topics" secondaryField="outputs" />; }
