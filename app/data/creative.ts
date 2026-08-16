import type { CreativeItem } from "./types";

export const creativeFilters = {
  practices: ["Design", "Crochet", "Weaving", "Drawing", "Ceramics", "Sculpture", "Writing"],
  materials: ["Yarn", "Fiber", "Paper", "Clay", "Digital"],
};

export const creativeItems: CreativeItem[] = [
  { section: "creative", id: "hexster", title: "Hexster", date: "2026", labels: ["Tabletop Game", "Team Bilby"], practice: "Design", materials: ["Paper"], description: "A cooperative route-building game about hamsters tunneling toward their partners through silent coordination, spatial reasoning, and a little mind-reading.", links: [{ label: "Project Page", url: "https://mechanicsofmagic.com/2026/07/10/p1-hexster-team-bilby/" }], featured: true, shape: "landscape", image: "/images/creative/hexster.png" },
  { section: "creative", id: "sixth-face", title: "The Sixth Face", date: "2026", labels: ["Game Design", "Team Bathyergus"], practice: "Design", materials: ["Digital"], description: "An experimental game project created with Team Bathyergus.", links: [{ label: "Project Page", url: "https://mechanicsofmagic.com/2026/08/14/p2-the-sixth-face-vincent-van-gogh-team-bathyergus/" }], featured: true, image: "/images/creative/sixth-face.png" },
  { section: "creative", id: "funnel-cake", title: "Funnel Cake Is Not Real Cake", date: "Notes", labels: ["Random Thoughts", "Writing"], practice: "Writing", materials: ["Paper"], description: "A short investigation into names, categories, and suspicious desserts." },
  { section: "creative", id: "taco-transport", title: "Tacos, Burritos & Nachos", date: "Notes", labels: ["Random Thoughts", "Writing"], practice: "Writing", materials: ["Paper"], description: "They may differ primarily in their transportation medium." },
  { section: "creative", id: "dragon", title: "Dragon", date: "Ongoing", labels: ["Creature", "Object"], practice: "Crochet", materials: ["Yarn"], description: "A small creature from an expanding handmade menagerie.", shape: "portrait", image: "/images/creative/dragon.jpeg" },
  { section: "creative", id: "jellyfish", title: "Jellyfish", date: "Ongoing", labels: ["Creature", "Object"], practice: "Crochet", materials: ["Yarn"], image: "/images/creative/jellyfish.jpeg" },
  { section: "creative", id: "frog", title: "Frog", date: "Ongoing", labels: ["Creature", "Object"], practice: "Crochet", materials: ["Yarn"], image: "/images/creative/frog.jpeg" },
  { section: "creative", id: "sweets", title: "Sweets", date: "Ongoing", labels: ["Cupcake · Donuts · Cake · Ice Cream", "Series"], practice: "Crochet", materials: ["Yarn"], description: "A soft collection of desserts: cupcake, donuts, cake, and ice cream.", featured: true, image: "/images/creative/sweets.jpeg" },
  { section: "creative", id: "woven-rainbow", title: "Woven Rainbow", date: "Ongoing", labels: ["Weaving", "Textile"], practice: "Weaving", materials: ["Yarn", "Fiber"], featured: true, shape: "landscape" },
  { section: "creative", id: "crochet-rainbow", title: "Crochet Rainbow", date: "Ongoing", labels: ["Crochet", "Object"], practice: "Crochet", materials: ["Yarn"] },
  { section: "creative", id: "crochet-swirl", title: "Swirl", date: "Ongoing", labels: ["Crochet", "Study"], practice: "Crochet", materials: ["Yarn"], image: "/images/creative/crochet-swirl.jpeg" },
  { section: "creative", id: "crochet-earrings", title: "金银", date: "Ongoing", labels: ["Crochet", "Wearable"], practice: "Crochet", materials: ["Yarn"], image: "/images/creative/crochet-earrings.jpeg" },
  { section: "creative", id: "ceramics-castle", title: "Castle", date: "Course Work", labels: ["Ceramics", "Object"], practice: "Ceramics", materials: ["Clay"], featured: true, image: "/images/creative/ceramics-castle.jpg" },
  { section: "creative", id: "ceramics-dinosaur", title: "Dinosaur", date: "Course Work", labels: ["Ceramics", "Object"], practice: "Ceramics", materials: ["Clay"], image: "/images/creative/ceramics-dinosaur.jpg" },
  { section: "creative", id: "ceramics-handpinch-1", title: "Hand Pinch I", date: "Course Work", labels: ["Ceramics", "Vessels"], practice: "Ceramics", materials: ["Clay"], image: "/images/creative/ceramics-handpinch-1.jpg" },
  { section: "creative", id: "ceramics-handpinch-2", title: "Hand Pinch II", date: "Course Work", labels: ["Ceramics", "Vessels"], practice: "Ceramics", materials: ["Clay"], image: "/images/creative/ceramics-handpinch-2.jpg" },
  { section: "creative", id: "ceramics-moon", title: "I Love You to the Moon and Back", date: "Course Work", labels: ["Ceramics", "Object"], practice: "Ceramics", materials: ["Clay"], image: "/images/creative/ceramics-moon.jpg" },
  { section: "creative", id: "ceramics-like", title: "赞", date: "Course Work", labels: ["Ceramics", "Object"], practice: "Ceramics", materials: ["Clay"], image: "/images/creative/ceramics-like.jpg" },
  { section: "creative", id: "yarn-sculpture", title: "Yarn Sculpture", date: "Course Project", labels: ["Sculpture", "Fiber"], practice: "Sculpture", materials: ["Yarn", "Fiber"], description: "A sculpture class final project made with yarn.", shape: "portrait", image: "/images/creative/pouring.jpeg" },
  { section: "creative", id: "seesaw", title: "Seesaw", date: "Course Project", labels: ["Sculpture", "Installation"], practice: "Sculpture", materials: [], shape: "landscape", image: "/images/creative/seesaw.jpeg" },
  { section: "creative", id: "beading", title: "Beading Studies", date: "2025", labels: ["Jewelry", "Collection"], practice: "Design", materials: [], shape: "landscape", image: "/images/creative/beading.jpeg" },
  { section: "creative", id: "drawings", title: "Drawings", date: "Ongoing", labels: ["Drawing", "Studies"], practice: "Drawing", materials: ["Paper"], description: "Lines, observations, visual notes, and studies collected over time." },
];
