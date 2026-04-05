# Named Colors

Constants and lookup for CSS Color Level 4 named colors.

```ts
import kleur from "@driangle/kleur";

const coral = kleur("coral"); // named color lookup
kleur.white;                  // color constant
```

## Color Constants

Pre-defined `Color` instances for common colors:

| Constant | Hex |
|----------|-----|
| `kleur.white` | `#ffffff` |
| `kleur.black` | `#000000` |
| `kleur.red` | `#ff0000` |
| `kleur.green` | `#008000` |
| `kleur.blue` | `#0000ff` |
| `kleur.yellow` | `#ffff00` |
| `kleur.cyan` | `#00ffff` |
| `kleur.magenta` | `#ff00ff` |
| `kleur.orange` | `#ffa500` |
| `kleur.purple` | `#800080` |
| `kleur.pink` | `#ffc0cb` |
| `kleur.lime` | `#00ff00` |
| `kleur.transparent` | `rgba(0,0,0,0)` |

```ts
import kleur from "@driangle/kleur";

kleur.contrast(kleur.white, kleur.black); // 21
```

## Named Color Lookup Integration

Named colors are automatically registered when you import from `@driangle/kleur`. This means `kleur("coral")` works out of the box:

```ts
import kleur from "@driangle/kleur";

const coral = kleur("coral"); // resolves via named color lookup
```
