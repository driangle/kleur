import { readFile } from "node:fs/promises";
import { join } from "node:path";
import kleur from "@driangle/kleur";

const root = new URL("../", import.meta.url);

const pages = [
  ["guide/getting-started.md", ["<CreateColorDemo />", "<AdjustColorDemo />", "<PaletteDemo />", "<ContrastDemo />", "<BlendDemo />"]],
  ["api/create.md", ["<CreateColorDemo />"]],
  ["api/color.md", ["<AdjustColorDemo />"]],
  ["api/analysis.md", ["<ContrastDemo />"]],
  ["api/blend.md", ["<BlendDemo />"]],
  ["api/distance.md", ["<DistanceDemo />"]],
  ["api/harmony.md", ["<PaletteDemo />"]],
];

for (const [relativePath, snippets] of pages) {
  const filePath = join(root.pathname, relativePath);
  const contents = await readFile(filePath, "utf8");

  for (const snippet of snippets) {
    if (!contents.includes(snippet)) {
      throw new Error(`${relativePath} is missing ${snippet}`);
    }
  }
}

if (kleur.mix(kleur.red, kleur.blue, 0.5).toHex() !== "#800080") {
  throw new Error("Interactive blend examples are out of sync with library behavior.");
}

if (kleur.contrast(kleur.white, kleur.black) !== 21) {
  throw new Error("Interactive contrast examples are out of sync with library behavior.");
}

console.log("interactive demo checks passed");
