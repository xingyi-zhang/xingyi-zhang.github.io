import type { ImgHTMLAttributes } from "react";

export type GooseSection = "research" | "creative" | "resources";
export type GoosePose = "peek" | "sleep";

const gooseSources: Record<GooseSection, Record<GoosePose, string>> = {
  research: { peek: "/images/goose/research-peek.png", sleep: "/images/goose/research-sleep.png" },
  creative: { peek: "/images/goose/creative-peek.png", sleep: "/images/goose/creative-sleep.png" },
  resources: { peek: "/images/goose/resources-peek.png", sleep: "/images/goose/resources-sleep.png" },
};

type GooseVariantProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  section: GooseSection;
  pose: GoosePose;
};

export function GooseVariant({ section, pose, alt = "", ...props }: GooseVariantProps) {
  return <img src={gooseSources[section][pose]} alt={alt} {...props} />;
}
