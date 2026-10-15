/** Pulls the JSON value out of a model reply that may wrap it in prose or a code fence. */
export function extractJson(text: string): unknown {
  let body = text.trim();
  const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(body);
  if (fence) body = fence[1].trim();
  try {
    return JSON.parse(body);
  } catch {
    const start = body.search(/[{[]/);
    const end = Math.max(body.lastIndexOf('}'), body.lastIndexOf(']'));
    if (start === -1 || end <= start)
      throw new Error('the reply contains no JSON');
    return JSON.parse(body.slice(start, end + 1));
  }
}

function hasRef(node: unknown): boolean {
  if (Array.isArray(node)) return node.some(hasRef);
  if (node && typeof node === 'object') {
    return Object.entries(node).some(([k, v]) => k === '$ref' || hasRef(v));
  }
  return false;
}

/** Providers that constrain output by schema cannot follow `$ref`s into `definitions`. */
export function isSelfContained(schema: unknown): schema is object {
  return !!schema && typeof schema === 'object' && !hasRef(schema);
}

function limitDepth(node: unknown, depth: number): unknown {
  if (Array.isArray(node))
    return depth <= 0 ? [] : node.map((n) => limitDepth(n, depth - 1));
  if (node && typeof node === 'object') {
    if (depth <= 0) return {};
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, limitDepth(v, depth - 1)]),
    );
  }
  return node;
}

/** Serialises a schema for a prompt, cutting nesting depth until it fits `maxChars`. */
export function schemaForPrompt(schema: unknown, maxChars = 24_000): string {
  const full = JSON.stringify(schema);
  if (full.length <= maxChars) return full;
  let text = full;
  for (const depth of [12, 8, 6, 4, 3, 2]) {
    text = JSON.stringify(limitDepth(schema, depth));
    if (text.length <= maxChars) break;
  }
  return text;
}
