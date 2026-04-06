/**
 * Extract the function name and argument tokens from a CSS color function.
 * Handles both comma-separated and space-separated (CSS Color Level 4) syntax,
 * including slash-separated alpha (e.g. `rgb(255 128 0 / 0.5)`).
 *
 * Returns [name, ...values] or null if the string isn't a valid function call.
 */
export function parseCssFunction(s: string): [string, ...string[]] | null {
  const open = s.indexOf("(");
  const close = s.lastIndexOf(")");
  if (open === -1 || close !== s.length - 1) return null;

  const name = s.slice(0, open).trim();
  const body = s.slice(open + 1, close).trim();
  if (!name || !body) return null;

  const isCommaSeparated = body.includes(",");
  const tokens = isCommaSeparated
    ? body.split(",").map((t) => t.trim())
    : body.split(/\s*\/\s*|\s+/);

  if (tokens.some((t) => t === "")) return null;

  return [name, ...tokens];
}

const NUMERIC_TOKEN = /^-?\d+(\.\d+)?(%)?$/;

/**
 * Parse a numeric token, stripping a trailing `%` if present.
 * Returns NaN for tokens with invalid unit suffixes.
 */
export function parseNumericToken(token: string): number {
  if (!NUMERIC_TOKEN.test(token)) return NaN;
  return parseFloat(token);
}
