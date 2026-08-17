import { AboutGallery } from "../components/AboutGallery";
import { creativeItems, researchItems } from "../data";

const selectedItems = [...researchItems, ...creativeItems].filter((item) => item.featured);

export default function About() {
  return <main className="about-page">
    <header className="page-heading about-heading">
      <p className="eyebrow">About</p>
      <h1>Xingyi Zhang</h1>
      <p>Observer · Researcher · Creator</p>
    </header>

    <section className="about-introduction">
      <p>I pay attention to how people perceive, decide, care, remember, and make meaning—and to the systems that help or fail them.</p>
      <p>TBC</p>
    </section>

    <AboutGallery items={selectedItems} />
  </main>;
}
