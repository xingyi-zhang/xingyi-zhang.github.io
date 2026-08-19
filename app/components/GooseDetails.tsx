"use client";

import { useEffect, useRef, useState } from "react";
import { GooseVariant, type GooseSection } from "./GooseVariant";

export function SectionPeekGoose({ section }: { section: GooseSection }) {
  return <div className={`section-peek-goose section-peek-${section}`} aria-hidden="true"><GooseVariant section={section} pose="peek" /></div>;
}

export function SleepyGoose({ section }: { section: GooseSection }) {
  const [dream, setDream] = useState(0);
  const dreamTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (dreamTimer.current) clearTimeout(dreamTimer.current);
  }, []);

  const showDream = () => {
    setDream((current) => current + 1);
    if (dreamTimer.current) clearTimeout(dreamTimer.current);
    dreamTimer.current = setTimeout(() => setDream(0), 1200);
  };

  return <button type="button" className={`sleepy-goose sleepy-${section}`} onClick={showDream} aria-label="The tired goose is sleeping">
    <GooseVariant section={section} pose="sleep" />
    {dream > 0 && <span className="dream-zs" key={dream} aria-hidden="true"><i>z</i><i>Z</i><i>Z</i></span>}
  </button>;
}

export function PeekGoose({ persistent = false }: { persistent?: boolean }) {
  const [honking, setHonking] = useState(false);
  const honkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (honkTimer.current) clearTimeout(honkTimer.current);
  }, []);

  const honk = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setHonking(false);
    if (honkTimer.current) clearTimeout(honkTimer.current);
    requestAnimationFrame(() => setHonking(true));
    honkTimer.current = setTimeout(() => setHonking(false), 850);
  };

  return <div className={`peek-goose${persistent ? " is-persistent" : ""}${honking ? " is-honking" : ""}`} onClick={honk} aria-hidden="true">
    <svg viewBox="0 0 256 256">
      <path className="peek-beak peek-beak-closed" d="M203 52c11 2 21 5 30 10 5 3 5 9 0 12-10 3-21 4-32 2l2-24Z"/>
      <path className="peek-beak-lower" d="M202 69c11 2 22 1 32-2-5 8-17 12-33 9l1-7Z"/>
      <path className="peek-body" d="M40 166c23-5 36-20 58-29 14-6 27-6 39-4 11 1 17-5 17-16 0-12-6-25-5-39 1-22 9-37 23-42 14-5 27 3 32 18l-3 22c-12 6-18 13-19 24-1 12 6 27 13 41 8 17 9 33 0 49-12 21-36 32-67 32-33 0-63-12-80-32-5-6-9-12-12-18-2-3 0-5 4-6Z"/>
      <circle className="peek-eye" cx="186" cy="51" r="3"/>
      <path className="peek-wing" d="M76 176c22 2 42-8 57-23"/>
      <path className="peek-legs" d="M113 208v19m41-18v18"/>
      <path className="peek-feet" d="m113 225-15 10h24Zm41 0-12 10h25Z"/>
    </svg>
    <span className="honk-word">HONK</span>
  </div>;
}

export function GooseFootprints() {
  return <div className="goose-footprints" aria-hidden="true">
    <span>⋔</span><span>⋔</span><span>⋔</span><span>⋔</span>
  </div>;
}
