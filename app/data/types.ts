export type Link = { label: string; url: string };

export type BaseItem = {
  id: string;
  title: string;
  date: string;
  labels: string[];
  description?: string;
  image?: string;
  gallery?: string[];
  links?: Link[];
  details?: boolean;
  featured?: boolean;
};

export type ResearchItem = BaseItem & {
  section: "research";
  topics: string[];
  outputs: string[];
};

export type CreativeItem = BaseItem & {
  section: "creative";
  practice: string;
  materials: string[];
  writingSections?: {
    title: string;
    entries: { label?: string; text: string }[];
  }[];
};

export type ResourceEntry = {
  title: string;
  creator?: string;
  year?: string;
  note?: string;
  stars?: 1 | 2 | 3;
  workbook?: boolean;
};

export type ResourceGroup = {
  title: string;
  entries: ResourceEntry[];
};

export type GuideSection = {
  title: string;
  paragraphs: string[];
};

export type ResourceItem = BaseItem & {
  section: "resources";
  topics: string[];
  outputs: string[];
  language?: string;
  introduction?: string;
  introParagraphs?: string[];
  contentNote?: string;
  groups?: ResourceGroup[];
  guideSections?: GuideSection[];
  items?: string[];
};

export type CatalogItem = ResearchItem | CreativeItem | ResourceItem;
