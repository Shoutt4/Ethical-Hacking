import { functionalities } from "../../data/pentest365";
import { HeroCard } from "./HeroCard";
import { HeroText } from "./HeroText";
import { WideCard } from "./WideCard";
import { TileCard } from "./TileCard";
import { CapabilityRail } from "./CapabilityRail";

export function FeatureBento() {
  const [hero, ...rest] = functionalities;
  const wide = rest.find((c) => c.size === "wide") ?? rest[0];
  const tiles = rest.filter((c) => c !== wide);

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
      <HeroCard cap={hero} />
      <HeroText cap={hero} delay={0.05} />
      <TileCard cap={tiles[0]} delay={0.1} />
      <WideCard cap={wide} delay={0.15} />
      <div className="sm:col-span-2 lg:col-span-3">
        <CapabilityRail caps={tiles.slice(1)} />
      </div>
    </div>
  );
}