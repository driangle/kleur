# Three.js

Use kleur to generate harmonious material colors for Three.js scenes. The `toNormalized()` method outputs 0–1 float RGB values that map directly to `THREE.Color(r, g, b)`.

## Material Colors from Harmonies

<a href="./three-materials" class="kl-demo-link">Open Demo &rarr;</a>

Generate a tetradic (or any) harmony and apply each color to a mesh material. `toNormalized()` returns `[r, g, b, a]` with values in 0–1 — exactly what Three.js expects:

```js
import kleur from "@driangle/kleur";
import * as THREE from "three";

const base = kleur("#ff6b35");
const palette = base.tetradic();

const meshes = [];
for (const color of palette) {
  const [r, g, b] = color.toNormalized();
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(r, g, b),
  });

  // Lightened variant for emissive glow
  const [er, eg, eb] = color.lighten(0.3).toNormalized();
  material.emissive = new THREE.Color(er, eg, eb);
  material.emissiveIntensity = 0.15;

  const mesh = new THREE.Mesh(geometry, material);
  meshes.push(mesh);
}
```

## Gradient-Based Skybox Colors

<a href="./three-skybox" class="kl-demo-link">Open Demo &rarr;</a>

Use `kleur.mix()` to interpolate between horizon and zenith colors for a procedural sky:

```js
const horizon = kleur("#ff7b54");
const zenith  = kleur("#1a1a3e");

// Sample 8 bands for a vertical gradient
for (let i = 0; i < 8; i++) {
  const t = i / 7;
  const [r, g, b] = kleur.mix(horizon, zenith, t).toNormalized();
  // Apply to sky geometry bands or shader uniforms
  uniforms.skyColors.value[i] = new THREE.Color(r, g, b);
}
```

## WebGL Shader Uniforms

<a href="./three-shader-uniforms" class="kl-demo-link">Open Demo &rarr;</a>

For custom shaders, `toNormalized()` gives you values ready for GLSL `vec3`/`vec4` uniforms:

```js
const color = kleur("#3a6bd5");
const [r, g, b, a] = color.toNormalized();

material.uniforms.uColor = { value: new THREE.Vector4(r, g, b, a) };
```
