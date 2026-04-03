# Installation

## Package Manager

::: code-group

```sh [npm]
npm install kleur
```

```sh [yarn]
yarn add kleur
```

```sh [pnpm]
pnpm add kleur
```

:::

## Importing

Kleur ships with full TypeScript types and supports both ESM and CommonJS.

### Namespace Import

Import the `Kleur` namespace for a single entry point to all functionality:

```ts
import { Kleur } from "kleur";

const color = Kleur.create.hex("#ff6600");
const lighter = color.lighten(0.2);
```

### Named Imports

Import individual functions directly:

```ts
import { hex, luminance, triadic } from "kleur";

const color = hex("#ff6600");
const lum = luminance(color);
const palette = triadic(color);
```

Both styles are equivalent — choose whichever reads best in your codebase.
