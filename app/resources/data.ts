export type ResourceCollection = {
  number: string;
  slug: string;
  title: string;
  kind: string;
  language: string;
  description: string;
  status: string;
  introduction: string;
  items: string[];
};

export const resourceCollections: ResourceCollection[] = [
  { number: "01", slug: "booklists", title: "Booklists", kind: "Collections", language: "English / 中文", description: "Reading collections organized around questions—including trauma, memory, the body, psychology, and care.", status: "Collection in progress", introduction: "Books and papers gathered around questions rather than disciplines. The first shelf will focus on trauma: how it is remembered, embodied, narrated, and cared for.", items: ["Trauma, memory & the body", "Psychology and care", "More shelves forthcoming"] },
  { number: "02", slug: "recommendations", title: "Recommendations", kind: "Practical Guides", language: "English / 中文", description: "Notes on insurance, treatment, and navigating the American health care system—including the small things people rarely explain.", status: "Guides in progress", introduction: "Plain-language guides for systems that are difficult to enter and even harder to understand—written especially for people navigating them across languages and cultures.", items: ["Navigating the American health care system / 美国医疗系统指南", "Insurance and treatment notes", "Useful questions to ask"] },
  { number: "03", slug: "patient-storytelling-and-talks", title: "Patient Storytelling & Talks", kind: "Stories", language: "English / 中文", description: "Patient narratives, conversations, and talks about illness, care, systems, and being heard.", status: "An open shelf", introduction: "A space for stories about being a patient, giving care, moving through institutions, and finding language for experiences that resist tidy explanations.", items: ["Patient narratives", "Conversations and talks", "Notes on illness, care & being heard"] },
];
