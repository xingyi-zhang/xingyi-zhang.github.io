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
};

export type ResourceItem = BaseItem & {
  section: "resources";
  topics: string[];
  outputs: string[];
  language?: string;
  introduction?: string;
  items?: string[];
};

export type CatalogItem = ResearchItem | CreativeItem | ResourceItem;
