# Installation

## Package Manager

::: code-group

```sh [npm]
npm install @driangle/kleur
```

```sh [yarn]
yarn add @driangle/kleur
```

```sh [pnpm]
pnpm add @driangle/kleur
```

:::

## Importing

Kleur ships with full TypeScript types and supports both ESM and CommonJS.

### Single Import

Import `kleur` for a single entry point to all functionality — it works as both a factory and a namespace:

```ts
import kleur from "@driangle/kleur";

const color = kleur("#ff6600");
const lighter = color.lighten(0.2);
const lum = kleur.luminance(color);
const palette = kleur.triadic(color);
```

### Named Imports

Import individual functions directly:

```ts
import { hex, luminance, triadic } from "@driangle/kleur";

const color = hex("#ff6600");
const lum = luminance(color);
const palette = triadic(color);
```

Both styles are equivalent — choose whichever reads best in your codebase.
