import type { ResourceItem } from "./types";

export const resourceFilters = {
  topics: ["Trauma", "Health Care", "Patient Stories", "Care"],
  outputs: ["Writing", "Reading List", "Guide", "Podcast", "Talk"],
};

export const resourceItems: ResourceItem[] = [
  { section: "resources", id: "booklists", details: true, title: "Booklists", date: "In progress", labels: ["Collections", "English / 中文"], topics: ["Trauma", "Care"], outputs: ["Reading List"], description: "Reading collections organized around questions—including trauma, memory, the body, psychology, and care.", language: "English / 中文", introduction: "Books and papers gathered around questions rather than disciplines. The first shelf will focus on trauma: how it is remembered, embodied, narrated, and cared for.", items: ["Trauma, memory & the body", "Psychology and care", "More shelves forthcoming"] },
  { section: "resources", id: "recommendations", details: true, title: "Recommendations", date: "In progress", labels: ["Practical Guides", "English / 中文"], topics: ["Health Care", "Care"], outputs: ["Writing", "Guide"], description: "Notes on insurance, treatment, and navigating the American health care system—including the small things people rarely explain.", language: "English / 中文", introduction: "Plain-language guides for systems that are difficult to enter and even harder to understand—written especially for people navigating them across languages and cultures.", items: ["Navigating the American health care system / 美国医疗系统指南", "Insurance and treatment notes", "Useful questions to ask"] },
  { section: "resources", id: "patient-storytelling-and-talks", details: true, title: "Patient Storytelling & Talks", date: "Open shelf", labels: ["Stories", "English / 中文"], topics: ["Patient Stories", "Care"], outputs: ["Writing", "Talk"], description: "Patient narratives, conversations, and talks about illness, care, systems, and being heard.", language: "English / 中文", introduction: "A space for stories about being a patient, giving care, moving through institutions, and finding language for experiences that resist tidy explanations.", items: ["Patient narratives", "Conversations and talks", "Notes on illness, care & being heard"] },
];
