# React

Use kleur to derive a complete UI theme from a single seed color. Generate primary, surface, and text tokens with automatic WCAG contrast validation.

## Dynamic Theming

<a href="./react-theming" class="kl-demo-link">Open Demo &rarr;</a>

A common pattern is computing CSS custom properties from one base color, then applying them to a root element. kleur's `lighten()`, `darken()`, and `contrast()` methods make this straightforward:

```jsx
import kleur from "@driangle/kleur";
import { useMemo } from "react";

function useTheme(seed, mode) {
  return useMemo(() => {
    const base = kleur(seed);
    const isDark = mode === "dark";

    const primary = base.toHex();
    const onPrimary = kleur.isLight(base) ? "#111111" : "#f5f5f5";
    const surface = isDark ? "#141414" : "#f5f5f5";
    const onSurface = isDark ? "#e8e8e8" : "#1a1a1a";

    return {
      "--primary": primary,
      "--primary-light": base.lighten(0.3).toHex(),
      "--primary-dark": base.darken(0.3).toHex(),
      "--surface": surface,
      "--on-surface": onSurface,
      "--on-primary": onPrimary,
    };
  }, [seed, mode]);
}
```

The `lighten(amount)` and `darken(amount)` methods scale proportionally — `lighten(0.3)` moves 30% toward white from the current lightness, so it works consistently across different seed colors.

## Contrast Validation

<a href="./react-contrast" class="kl-demo-link">Open Demo &rarr;</a>

Use `kleur.contrast()` to verify that your derived tokens meet accessibility requirements:

```jsx
function ContrastBadge({ foreground, background }) {
  const ratio = kleur.contrast(kleur(foreground), kleur(background));
  const passAA = ratio >= 4.5;

  return (
    <span className={passAA ? "pass" : "fail"}>
      {ratio.toFixed(2)}:1 {passAA ? "AA" : "Fail"}
    </span>
  );
}
```

## Palette-Based Component Variants

<a href="./react-palette-variants" class="kl-demo-link">Open Demo &rarr;</a>

Generate tint and shade scales for component variant systems:

```jsx
import kleur from "@driangle/kleur";
import { useMemo } from "react";

function useVariants(hex, steps) {
  return useMemo(() => {
    const base = kleur(hex);
    const tints = [...base.tints(steps)];
    const shades = [...base.shades(steps)];

    return { tints, base, shades };
  }, [hex, steps]);
}

function Button({ variant, children }) {
  const { tints, base, shades } = useVariants("#3a6bd5", 5);

  const bg = variant === "light"
    ? tints[2].toHex()
    : variant === "dark"
      ? shades[2].toHex()
      : base.toHex();

  const color = kleur.isLight(bg)
    ? kleur(bg).darken(0.8).toHex()
    : kleur(bg).lighten(0.9).toHex();

  return (
    <button style={{ background: bg, color }}>
      {children}
    </button>
  );
}
```
