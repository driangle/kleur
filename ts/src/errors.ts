/**
 * Library-specific runtime errors exposed as part of the public API.
 */

export class KleurError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KleurError";
  }
}

export type ParseErrorKind = "hex" | "css" | "named" | "value";

export class ParseError extends KleurError {
  readonly kind: ParseErrorKind;
  readonly input: unknown;
  readonly reason?: "missing-prefix" | "invalid-length" | "invalid-digits";

  constructor(
    kind: "hex",
    input: string,
    reason: "missing-prefix" | "invalid-length" | "invalid-digits",
  );
  constructor(kind: "css", input: string);
  constructor(kind: "named", input: string);
  constructor(kind: "value", input: unknown);
  constructor(
    kind: ParseErrorKind,
    input: unknown,
    reason?: "missing-prefix" | "invalid-length" | "invalid-digits",
  ) {
    const message = buildParseMessage(kind, input, reason);
    super(message);
    this.name = "ParseError";
    this.kind = kind;
    this.input = input;
    this.reason = reason;
  }
}

function buildParseMessage(
  kind: ParseErrorKind,
  input: unknown,
  reason?: string,
): string {
  switch (kind) {
    case "hex": {
      const messages: Record<string, string> = {
        "missing-prefix": `Invalid hex color: "${input}" (must start with #)`,
        "invalid-length": `Invalid hex color: "${input}" (must be 3 or 6 digits)`,
        "invalid-digits": `Invalid hex color: "${input}" (contains non-hex characters)`,
      };
      return messages[reason!];
    }
    case "css":
      return `Invalid CSS color: "${input}"`;
    case "named":
      return `Unknown color: "${input}"`;
    case "value":
      return `Invalid color value: ${String(input)}`;
  }
}

export type UnknownOptionKind =
  | "distancePreset"
  | "colorSpace"
  | "distanceMethod"
  | "blendMode";

export class UnknownOptionError extends KleurError {
  readonly kind: UnknownOptionKind;
  readonly value: string;
  readonly validOptions: readonly string[];

  constructor(
    kind: UnknownOptionKind,
    value: string,
    validOptions: readonly string[],
  ) {
    const message = buildUnknownOptionMessage(kind, value, validOptions);
    super(message);
    this.name = "UnknownOptionError";
    this.kind = kind;
    this.value = value;
    this.validOptions = validOptions;
  }
}

function buildUnknownOptionMessage(
  kind: UnknownOptionKind,
  value: string,
  validOptions: readonly string[],
): string {
  const labels: Record<UnknownOptionKind, string> = {
    distancePreset: "distance preset",
    colorSpace: "color space",
    distanceMethod: "distance method",
    blendMode: "blend mode",
  };
  const label = labels[kind];
  return `Unknown ${label} "${value}". Valid ${label}s: ${validOptions.join(", ")}`;
}

export class MissingRegistrationError extends KleurError {
  readonly module: string;

  constructor(module: string) {
    super(`${module} not registered. Import ${module.toLowerCase()}.js first.`);
    this.name = "MissingRegistrationError";
    this.module = module;
  }
}

export class InvalidOffsetError extends KleurError {
  readonly value: number;

  constructor(value: number) {
    super(
      `Invalid offset: ${value}. Offset must be a finite number.`,
    );
    this.name = "InvalidOffsetError";
    this.value = value;
  }
}

export class InvalidCountError extends KleurError {
  readonly value: number;

  constructor(value: number) {
    super(
      `Invalid count: ${value}. Count must be a non-negative finite integer.`,
    );
    this.name = "InvalidCountError";
    this.value = value;
  }
}

export class InvalidDistanceCombinationError extends KleurError {
  readonly method: string;
  readonly space: string;
  readonly validSpaces: readonly string[];

  constructor(method: string, space: string, validSpaces: readonly string[]) {
    super(
      `Method "${method}" is not valid for space "${space}". Valid spaces for ${method}: ${validSpaces.join(", ")}`,
    );
    this.name = "InvalidDistanceCombinationError";
    this.method = method;
    this.space = space;
    this.validSpaces = validSpaces;
  }
}
