/**
 * Library-specific runtime errors exposed as part of the public API.
 */

export class KleurError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KleurError";
  }
}

export class InvalidHexColorError extends KleurError {
  readonly input: string;
  readonly reason: "missing-prefix" | "invalid-length" | "invalid-digits";

  constructor(input: string, reason: "missing-prefix" | "invalid-length" | "invalid-digits") {
    const messages: Record<typeof reason, string> = {
      "missing-prefix": `Invalid hex color: "${input}" (must start with #)`,
      "invalid-length": `Invalid hex color: "${input}" (must be 3 or 6 digits)`,
      "invalid-digits": `Invalid hex color: "${input}" (contains non-hex characters)`,
    };
    const message = messages[reason];
    super(message);
    this.name = "InvalidHexColorError";
    this.input = input;
    this.reason = reason;
  }
}

export class InvalidCssColorError extends KleurError {
  readonly input: string;

  constructor(input: string) {
    super(`Invalid CSS color: "${input}"`);
    this.name = "InvalidCssColorError";
    this.input = input;
  }
}

export class UnknownColorError extends KleurError {
  readonly input: string;

  constructor(input: string) {
    super(`Unknown color: "${input}"`);
    this.name = "UnknownColorError";
    this.input = input;
  }
}

export class InvalidColorValueError extends KleurError {
  readonly value: unknown;

  constructor(value: unknown) {
    super(`Invalid color value: ${String(value)}`);
    this.name = "InvalidColorValueError";
    this.value = value;
  }
}

export class UnknownDistancePresetError extends KleurError {
  readonly preset: string;
  readonly validPresets: readonly string[];

  constructor(preset: string, validPresets: readonly string[]) {
    super(`Unknown distance preset "${preset}". Valid presets: ${validPresets.join(", ")}`);
    this.name = "UnknownDistancePresetError";
    this.preset = preset;
    this.validPresets = validPresets;
  }
}

export class UnknownColorSpaceError extends KleurError {
  readonly space: string;
  readonly validSpaces: readonly string[];

  constructor(space: string, validSpaces: readonly string[]) {
    super(`Unknown color space "${space}". Valid spaces: ${validSpaces.join(", ")}`);
    this.name = "UnknownColorSpaceError";
    this.space = space;
    this.validSpaces = validSpaces;
  }
}

export class UnknownDistanceMethodError extends KleurError {
  readonly method: string;
  readonly validMethods: readonly string[];

  constructor(method: string, validMethods: readonly string[]) {
    super(`Unknown distance method "${method}". Valid methods: ${validMethods.join(", ")}`);
    this.name = "UnknownDistanceMethodError";
    this.method = method;
    this.validMethods = validMethods;
  }
}

export class InvalidBlendModeError extends KleurError {
  readonly mode: string;
  readonly validModes: readonly string[];

  constructor(mode: string, validModes: readonly string[]) {
    super(`Unknown blend mode "${mode}". Valid modes: ${validModes.join(", ")}`);
    this.name = "InvalidBlendModeError";
    this.mode = mode;
    this.validModes = validModes;
  }
}

export class MissingRegistrationError extends KleurError {
  readonly module: string;

  constructor(module: string) {
    super(`${module} not registered. Import ${module.toLowerCase()}.js first.`);
    this.name = "MissingRegistrationError";
    this.module = module;
  }
}

export class InvalidDistanceCombinationError extends KleurError {
  readonly method: string;
  readonly space: string;
  readonly validSpaces: readonly string[];

  constructor(method: string, space: string, validSpaces: readonly string[]) {
    super(`Method "${method}" is not valid for space "${space}". Valid spaces for ${method}: ${validSpaces.join(", ")}`);
    this.name = "InvalidDistanceCombinationError";
    this.method = method;
    this.space = space;
    this.validSpaces = validSpaces;
  }
}
