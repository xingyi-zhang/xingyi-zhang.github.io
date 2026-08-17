import { Collection } from "../components";
import { researchFilters, researchItems } from "../data";

export default function Research() { return <Collection title="Research" items={researchItems} filters={researchFilters.topics} initialFilter="Open Science" filterLabel="Topics" secondaryOptions={researchFilters.outputs} secondaryFilterLabel="Outputs" primaryField="topics" secondaryField="outputs" />; }
