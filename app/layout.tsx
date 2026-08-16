import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./components";

export const metadata: Metadata = { metadataBase: new URL("https://xingyi-zhang.github.io"), title: { default: "Xingyi Zhang — Collection", template: "%s — Xingyi Zhang" }, description: "A collection of research, games, objects, experiments, and things Xingyi Zhang has been curious about.", robots: { index: true, follow: true }, icons: { icon: "/favicon.svg" }, openGraph: { title: "Xingyi Zhang", description: "A collection of curious things.", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Xingyi Zhang — A collection of curious things." }] }, twitter: { card: "summary_large_image", images: ["/og.png"] } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}</body></html>; }
