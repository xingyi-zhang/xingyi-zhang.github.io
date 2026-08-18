"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const exhibits = [
  { name: "Graph blackboard", href: "/research?filter=Graphs%20%26%20Groups&from=blackboard", x: 16, y: 56, image: "/images/home/research-graph.png", className: "exhibit-graph" },
  { name: "Perception models", href: "/research?filter=Perception&from=perception-models", x: 24, y: 58, image: "/images/home/research-perception.png", className: "exhibit-perception" },
  { name: "Open science archive", href: "/research?filter=Open%20Science&from=open-book", x: 17, y: 71, image: "/images/home/research-open-book.png", className: "exhibit-open-science" },
  { name: "Ceramics table", href: "/creative?filter=Ceramics&from=ceramics-table", x: 48, y: 16, image: "/images/home/creative-ceramics.png", className: "exhibit-ceramics" },
  { name: "Yarn basket", href: "/creative?filter=Crochet&from=yarn-basket", x: 55, y: 17, image: "/images/home/creative-yarn.png", className: "exhibit-yarn" },
  { name: "Bookshelf", href: "/resources?filter=Trauma&from=bookshelf", x: 74, y: 56, image: "/images/home/resources-bookshelf.png", className: "exhibit-bookshelf" },
  { name: "Care kit", href: "/resources?filter=Health%20Care&from=care-kit", x: 82, y: 57, image: "/images/home/resources-care-kit.png", className: "exhibit-care" },
  { name: "Listening station", href: "/resources?from=listening-station", x: 82, y: 71, image: "/images/home/resources-listening.png", className: "exhibit-listening" },
];

const entrances = [
  { name: "Research entrance", href: "/research?from=research-entrance", x: 33, y: 74 },
  { name: "Creative entrance", href: "/creative?from=creative-entrance", x: 50, y: 29 },
  { name: "Resources entrance", href: "/resources?from=resources-entrance", x: 67, y: 74 },
  { name: "The pond", href: "/about?from=pond", x: 50, y: 55 },
];

const observationPoints = [...exhibits, ...entrances];

function nearbyPoint(x: number, y: number) {
  return observationPoints.find((point) => Math.hypot(point.x - x, (point.y - y) * .8) < 7.5) ?? null;
}

export function HomeMuseum() {
  const plan = useRef<HTMLDivElement>(null);
  const motionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const honkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 88 });
  const [walking, setWalking] = useState(false);
  const [observing, setObserving] = useState(false);
  const [honking, setHonking] = useState(false);
  const [departing, setDeparting] = useState<string | null>(null);
  const [travelTime, setTravelTime] = useState("2.4s");
  const nearby = nearbyPoint(position.x, position.y);

  const startWalking = (duration: number) => {
    setObserving(false);
    setWalking(true);
    if (motionTimer.current) clearTimeout(motionTimer.current);
    motionTimer.current = setTimeout(() => setWalking(false), duration);
  };

  const moveTo = (x: number, y: number, keyboard = false) => {
    setPosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(8, Math.min(93, y)) });
    setTravelTime(keyboard ? ".38s" : "2.4s");
    startWalking(keyboard ? 430 : 2450);
  };

  const observe = () => {
    if (observing) return;
    setWalking(false);
    setObserving(true);
    if (observeTimer.current) clearTimeout(observeTimer.current);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    const destination = nearbyPoint(position.x, position.y);
    observeTimer.current = setTimeout(() => setObserving(false), destination ? 1400 : 1250);
    if (destination) {
      const wing = destination.href.startsWith("/research") ? "research" : destination.href.startsWith("/creative") ? "creative" : destination.href.startsWith("/resources") ? "resources" : "about";
      sessionStorage.setItem("collection-garden-position", JSON.stringify({ x: destination.x, y: destination.y }));
      setDeparting(wing);
      navigationTimer.current = setTimeout(() => { window.location.href = destination.href; }, 1050);
    }
  };

  const honk = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setWalking(false);
    setObserving(false);
    setHonking(false);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (honkTimer.current) clearTimeout(honkTimer.current);
    requestAnimationFrame(() => setHonking(true));
    honkTimer.current = setTimeout(() => setHonking(false), 850);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("collection-garden-position");
    if (!saved) return;
    try {
      const restored = JSON.parse(saved) as { x?: number; y?: number };
      if (typeof restored.x === "number" && typeof restored.y === "number") {
        setTravelTime("0s");
        setPosition({ x: restored.x, y: restored.y });
      }
    } catch { /* Ignore stale session data. */ }
  }, []);

  useEffect(() => {
    const revealGarden = () => setDeparting(null);
    window.addEventListener("pageshow", revealGarden);
    return () => window.removeEventListener("pageshow", revealGarden);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        observe();
        return;
      }
      const steps: Record<string, [number, number]> = {
        ArrowLeft: [-2.5, 0], a: [-2.5, 0], A: [-2.5, 0], ArrowRight: [2.5, 0], d: [2.5, 0], D: [2.5, 0],
        ArrowUp: [0, -3.5], w: [0, -3.5], W: [0, -3.5], ArrowDown: [0, 3.5], s: [0, 3.5], S: [0, 3.5],
      };
      const step = steps[event.key];
      if (!step) return;
      event.preventDefault();
      moveTo(position.x + step[0], position.y + step[1], true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [position, observing]);

  useEffect(() => () => {
    if (motionTimer.current) clearTimeout(motionTimer.current);
    if (observeTimer.current) clearTimeout(observeTimer.current);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (honkTimer.current) clearTimeout(honkTimer.current);
  }, []);

  const onPlanClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const bounds = plan.current?.getBoundingClientRect();
    if (!bounds) return;
    moveTo(((event.clientX - bounds.left) / bounds.width) * 100, ((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const gooseStyle = { left: `${position.x}%`, top: `${position.y}%`, "--travel-time": travelTime } as CSSProperties;

  return <section className="museum" aria-label="Collection floor plan">
    <div className="floor-plan" ref={plan} onClick={onPlanClick} tabIndex={0} aria-label="Interactive collection map. Click or use arrow keys and WASD to walk. Press space to observe.">
      <svg className="floor-architecture" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <pattern id="studio-floor" width="58" height="18" patternUnits="userSpaceOnUse"><path d="M0 18H58M29 0V18"/></pattern>
          <pattern id="gallery-floor" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M0 42H42M42 0V42"/></pattern>
        </defs>
        <path className="garden-path garden-path-main" d="M508 640C481 590 530 541 505 476"/>
        <path className="garden-path" d="M500 270V163M374 411L330 472M626 411L670 472"/>

        <rect className="building-shadow" x="411" y="42" width="198" height="133" rx="3"/>
        <rect className="building-shadow" x="111" y="326" width="228" height="243" rx="3"/>
        <rect className="building-shadow" x="671" y="326" width="228" height="243" rx="3"/>
        <rect className="building-floor" x="400" y="30" width="200" height="133" rx="2"/>
        <rect className="building-floor" x="100" y="314" width="230" height="243" rx="2"/>
        <rect className="building-floor" x="670" y="314" width="230" height="243" rx="2"/>
        <rect className="floor-pattern studio-pattern" x="400" y="30" width="200" height="133" rx="2"/>
        <rect className="floor-pattern gallery-pattern" x="100" y="314" width="230" height="243" rx="2"/>
        <rect className="floor-pattern gallery-pattern" x="670" y="314" width="230" height="243" rx="2"/>
        <path className="building-eave" d="M400 30H600V163H535M465 163H400V30M100 314H330V452M330 492V557H100V314M670 314H900V557H670V492M670 452V314"/>
        <path className="building-wall" d="M408 39H592V154H535M465 154H408V39M109 323H321V452M321 492V548H109V323M679 323H891V548H679V492M679 452V323"/>
        <path className="portico" d="M465 163V185H535V163M330 452H353V492H330M670 452H647V492H670"/>
        <path className="doorstep" d="M466 163H534M330 453V491M670 453V491"/>

      </svg>

      <img className="garden-grass" src="/images/home/grass-tuft.png" alt="" aria-hidden="true" />

      {exhibits.map((exhibit) => <button className={`observation-object ${exhibit.className}`} style={{ left: `${exhibit.x}%`, top: `${exhibit.y}%` }} type="button" onClick={() => moveTo(exhibit.x, exhibit.y)} aria-label={`Walk to ${exhibit.name}`} key={exhibit.name}><img src={exhibit.image} alt="" /></button>)}
      <button className="museum-pond" type="button" onClick={() => moveTo(50, 55)} aria-label="Walk to the pond"><img src="/images/home/pond.png" alt="" /></button>
      {entrances.slice(0, 3).map((entrance) => <button className="door-threshold" style={{ left: `${entrance.x}%`, top: `${entrance.y}%` }} type="button" onClick={() => moveTo(entrance.x, entrance.y)} aria-label={`Walk to ${entrance.name}`} key={entrance.href}/>) }

      <div className={`walking-goose${walking ? " is-walking" : ""}${observing ? " is-observing" : ""}${honking ? " is-honking" : ""}`} style={gooseStyle} onClick={honk} aria-hidden="true">
        <svg className="goose-idle" viewBox="0 0 256 256">
          <path className="goose-beak goose-beak-closed" d="M203 52c11 2 21 5 30 10 5 3 5 9 0 12-10 3-21 4-32 2l2-24Z"/>
          <path className="goose-beak-lower" d="M202 69c11 2 22 1 32-2-5 8-17 12-33 9l1-7Z"/>
          <path className="goose-body" d="M40 166c23-5 36-20 58-29 14-6 27-6 39-4 11 1 17-5 17-16 0-12-6-25-5-39 1-22 9-37 23-42 14-5 27 3 32 18l-3 22c-12 6-18 13-19 24-1 12 6 27 13 41 8 17 9 33 0 49-12 21-36 32-67 32-33 0-63-12-80-32-5-6-9-12-12-18-2-3 0-5 4-6Z"/>
          <circle className="goose-eye" cx="186" cy="51" r="3"/>
          <path className="goose-wing" d="M76 176c22 2 42-8 57-23"/>
          <g className="goose-leg leg-one"><path d="M113 207v30"/><path d="M113 232c-8 1-15 5-21 10-2 2-1 5 2 5h27c3 0 4-3 2-5l-10-10Z"/></g>
          <g className="goose-leg leg-two"><path d="M154 208v29"/><path d="M154 232c-7 1-14 5-20 10-2 2-1 5 2 5h27c3 0 4-3 2-5l-9-10Z"/></g>
        </svg>
        <svg className="goose-observe" viewBox="0 0 256 256">
          <path className="goose-beak" d="M216 58c8 1 15 4 21 7 4 3 4 8 0 10-7 3-14 4-22 3-2-7-1-14 1-20Z"/>
          <path className="goose-body" d="M34 136c20-4 36-20 58-27 14-5 28-4 41 0 13 4 25 3 31-6 6-9 4-22 7-32 5-18 20-27 35-22 13 4 20 17 17 31-3 15-17 23-24 33-5 8-4 18 0 28 7 18-1 31-17 39-17 9-43 12-67 10-34-2-64-16-82-36-5-6-4-8 1-9Z"/>
          <circle className="goose-eye" cx="211" cy="66" r="3"/>
          <path className="goose-wing" d="M66 137c19 1 35-7 48-20"/>
          <g className="goose-leg"><path d="M92 187v27"/><path d="M92 210c-8 1-15 5-21 10-2 2-1 5 2 5h27c3 0 4-3 2-5l-10-10Z"/></g>
          <g className="goose-leg"><path d="M134 187v27"/><path d="M134 210c-7 1-14 5-20 10-2 2-1 5 2 5h27c3 0 4-3 2-5l-9-10Z"/></g>
        </svg>
        <span className="honk-word">HONK</span>
      </div>

      <div className="map-controls">
        <div className="control-row walk-guide"><span className="command-label">Walk</span><span className="click-control"><span>Click</span><i className="mouse-icon" aria-hidden="true" /></span><span className="key-divider">or</span><span className="key-cluster" aria-label="Arrow keys"><kbd className="key-up">↑</kbd><kbd className="key-left">←</kbd><kbd className="key-down">↓</kbd><kbd className="key-right">→</kbd></span><span className="key-divider">or</span><span className="key-cluster" aria-label="W A S D keys"><kbd className="key-up">W</kbd><kbd className="key-left">A</kbd><kbd className="key-down">S</kbd><kbd className="key-right">D</kbd></span></div>
        <button className="control-row observe-guide" type="button" onClick={observe}><span className="command-label">Observe</span><kbd>Space</kbd></button>
      </div>
      <div className={`observation-status${nearby ? " is-active" : ""}`} aria-live="polite">
        <span>{observing ? "Observing" : nearby ? "Something nearby" : "Wandering"}</span>
        <strong>{nearby?.name ?? "The collection"}</strong>
      </div>
      <div className={`garden-transition${departing ? " is-active" : ""}`} data-wing={departing ?? undefined} style={{ "--exit-x": `${position.x}%`, "--exit-y": `${position.y}%` } as CSSProperties} aria-hidden="true" />
    </div>
  </section>;
}
