import fs from 'fs';
import path from 'path';
import GlobeBlock from "@/components/GlobeBlock";
import {Metadata} from "next";
import {getTokensByCountries, MintCountRecord} from "@/database/token";

export const metadata: Metadata = {
  title: "Meta globe",
  description: "Mint your own globe"
}

export default async function Globe() {
  const filePath = path.join(process.cwd(), 'public', 'dump', 'countries.geojson');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  const colorsData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'public', 'dump', 'country_colors.json'),
      'utf8'
    )
  );

  const mintCounts: MintCountRecord[] = await getTokensByCountries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GlobeBlock data={data} colors={colorsData} mintCounts={mintCounts} />
    </main>
  );
}