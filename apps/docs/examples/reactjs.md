# React

<a href="./reactjs-demo" class="kl-demo-link">Open Standalone Demo &rarr;</a>

Use kleur to derive a complete UI theme from a single seed color. Generate primary, surface, and text tokens with automatic WCAG contrast validation.

## Dynamic Theming

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

<ReactThemeDemo />

## Contrast Validation

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

Generate tint and shade scales for component variant systems:

```jsx
const base = kleur("#3a6bd5");
const tints = base.tints(5);   // 5 lighter steps
const shades = base.shades(5); // 5 darker steps

// Use as button variant tokens
const variants = {
  light:   tints.at(2).toHex(),
  default: base.toHex(),
  dark:    shades.at(2).toHex(),
};
```
