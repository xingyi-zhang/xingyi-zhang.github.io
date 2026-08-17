import { Collection } from "../components";
import { resourceFilters, resourceItems } from "../data";

export default function Resources() { return <Collection title="Resources" eyebrow="Library" subtitle="Things I wish were easier to find." items={resourceItems} filters={resourceFilters.topics} initialFilter="Trauma" filterLabel="Topics" secondaryOptions={resourceFilters.outputs} secondaryFilterLabel="Outputs" primaryField="topics" secondaryField="outputs" />; }
