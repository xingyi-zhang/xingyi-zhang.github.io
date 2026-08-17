import { PeekGoose } from "./components/GooseDetails";

export default function NotFound() {
  return <main className="not-found-page">
    <p className="eyebrow">404</p>
    <h1>This goose wandered somewhere else.</h1>
    <a href="/">Return to the collection</a>
    <PeekGoose persistent />
  </main>;
}
