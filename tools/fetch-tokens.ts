import * as fs from 'fs';
import * as path from 'path';

interface ScryfallCard {
  id: string;
  name: string;
  artist?: string;
  image_uris?: { art_crop?: string };
}
interface ScryfallPage {
  data: ScryfallCard[];
  has_more: boolean;
  next_page?: string;
}

interface TokenEntry {
  id: string;
  name: string;
  artist: string;
  artCropUrl: string;
}

const QUERY =
  'type:token+type:creature+frame:2015+game:paper+-is:reprint';
const TARGET = 20;
const SLEEP_MS = 100;
const UA = 'sussy-bingo-token-fetcher/1.0 (https://github.com/20q2/sussy-bingo)';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function fetchPage(url: string): Promise<ScryfallPage> {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Scryfall ${res.status} for ${url}`);
  return res.json() as Promise<ScryfallPage>;
}

async function main(): Promise<void> {
  const base =
    `https://api.scryfall.com/cards/search?q=${QUERY}` +
    `&unique=art&order=released`;
  const collected: TokenEntry[] = [];
  const seenNames = new Set<string>();

  let url: string | undefined = base;
  while (url && collected.length < TARGET) {
    const page: ScryfallPage = await fetchPage(url);
    for (const c of page.data) {
      if (collected.length >= TARGET) break;
      const art = c.image_uris?.art_crop;
      if (!art || !c.name) continue;
      if (seenNames.has(c.name)) continue;
      seenNames.add(c.name);
      collected.push({
        id: c.id,
        name: c.name,
        artist: c.artist ?? 'Unknown',
        artCropUrl: art,
      });
    }
    if (!page.has_more) break;
    url = page.next_page;
    await sleep(SLEEP_MS);
  }

  if (collected.length < TARGET) {
    console.warn(
      `WARN: only found ${collected.length}/${TARGET} tokens`,
    );
  }

  const json = JSON.stringify(collected, null, 2);
  const repoRoot = path.resolve(__dirname, '..');
  const assetPath = path.join(repoRoot, 'src', 'assets', 'tokens.json');
  const lambdaPath = path.join(repoRoot, 'infra', 'lambda', 'tokens.json');
  fs.writeFileSync(assetPath, json);
  fs.writeFileSync(lambdaPath, json);

  console.log(`Wrote ${collected.length} tokens to:`);
  console.log(`  ${assetPath}`);
  console.log(`  ${lambdaPath}`);
  console.log('Artists:');
  for (const t of collected) console.log(`  ${t.name} — ${t.artist}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
