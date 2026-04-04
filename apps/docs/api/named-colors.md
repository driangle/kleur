# Named Colors

Lookup and constants for CSS Color Level 4 named colors.

```ts
import { getNamedColor, white, black, red, green, blue } from "@driangle/kleur";
// or
import { Kleur } from "@driangle/kleur";
// Kleur.named.get("coral"), Kleur.named.white, etc.
```

## getNamedColor

```ts
getNamedColor(name: string): Color | undefined
```

Case-insensitive lookup of any of the 148 CSS Color Level 4 named colors. Returns `undefined` if the name is not recognized.

```ts
const coral = getNamedColor("coral");    // Color
const none = getNamedColor("notacolor"); // undefined
```

The special name `"transparent"` returns a fully transparent black (`rgba(0,0,0,0)`).

## Color Constants

Pre-defined `Color` instances for common colors:

| Constant | Hex |
|----------|-----|
| `white` | `#ffffff` |
| `black` | `#000000` |
| `red` | `#ff0000` |
| `green` | `#008000` |
| `blue` | `#0000ff` |
| `yellow` | `#ffff00` |
| `cyan` | `#00ffff` |
| `magenta` | `#ff00ff` |
| `orange` | `#ffa500` |
| `purple` | `#800080` |
| `pink` | `#ffc0cb` |
| `lime` | `#00ff00` |
| `transparent` | `rgba(0,0,0,0)` |

```ts
import { white, black, contrast } from "@driangle/kleur";

contrast(white, black); // 21
```

## Named Color Lookup Integration

Named colors are automatically registered when you import from `kleur`. This means `object("coral")` works out of the box:

```ts
import { object } from "@driangle/kleur";

const coral = object("coral"); // resolves via named color lookup
```
