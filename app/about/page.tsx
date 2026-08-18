import { AboutGallery } from "../components/AboutGallery";
import { GooseFootprints } from "../components/GooseDetails";
import { creativeItems, researchItems } from "../data";

const collection = [...researchItems, ...creativeItems];
const galleryIds = ["sixth-face", "lovesims", "irw", "dna", "jellyfish", "yarn-sculpture"];
const selectedItems = galleryIds.flatMap((id) => {
  const item = collection.find((candidate) => candidate.id === id);
  return item ? [item] : [];
});

export default function About() {
  return <main className="about-page">
    <header className="page-heading about-heading">
      <p className="eyebrow">About</p>
      <h1>Xingyi Zhang</h1>
      <p>Observer · Researcher · Creator</p>
    </header>

    <section className="about-introduction">
      <p>I pay attention to how people perceive, decide, care, remember, and make meaning—and to the systems that help or fail them.</p>
      <a className="about-contact" href="https://www.instagram.com/goose.existing/" target="_blank" rel="noreferrer" aria-label="@goose.existing on Instagram">
        <img className="about-contact-goose" src="/goose-transparent.svg" alt="Goose" width="210" height="210" />
        <span>@goose.existing</span>
      </a>
    </section>

    <AboutGallery items={selectedItems} />
    <GooseFootprints />
  </main>;
}
