import { Collection } from "../components";
import { creativeFilters, creativeItems } from "../data";

export default function Creative() { return <Collection title="Creative" subtitle="Designed, written, stitched, drawn, and occasionally inexplicable." items={creativeItems} filters={creativeFilters.practices} initialFilter="Design" filterLabel="Practice" secondaryOptions={creativeFilters.materials} secondaryFilterLabel="Materials" primaryField="practice" secondaryField="materials" />; }
