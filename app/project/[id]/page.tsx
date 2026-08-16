import { notFound } from "next/navigation";
import { ItemDetail } from "../../components";
import { creativeItems, researchItems } from "../../data";

const projectItems = [...researchItems, ...creativeItems];

export function generateStaticParams() { return projectItems.map((item) => ({ id: item.id })); }

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = projectItems.find((project) => project.id === id);
  if (!item) return notFound();
  return <ItemDetail item={item} />;
}
