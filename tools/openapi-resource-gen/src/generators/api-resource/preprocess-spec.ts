// Changes made to the parsed spec before anything is generated from it: overlays, the operation
// filters and the dropped security schemes. Everything downstream (schema.d.ts, the tokens, the
// mocks and the manifest) sees the result, so the options act as if the spec had been edited.

const HTTP_METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** The id an operation without an `operationId` gets: `get /api/pets/{id}` → `get_api_pets_id`. */
export function fallbackOperationId(method: string, apiPath: string): string {
  return `${method}_${apiPath.replace(/\W+/g, '_').replace(/^_|_$/g, '')}`;
}

// ---------------------------------------------------------------------------------------------
// Overlays (OpenAPI Overlay Specification 1.0)
// ---------------------------------------------------------------------------------------------

/** One step of a JSONPath expression. */
type Segment =
  | { kind: 'name'; name: string }
  | { kind: 'index'; index: number }
  | { kind: 'wildcard' }
  | { kind: 'descendants' };

/**
 * Parses the JSONPath subset overlays need to address a spec: `$`, `.name`, `['name']` / `["name"]`
 * (for paths such as `'/pets/{id}'`), `[0]`, `*` / `[*]` and `..`. Filter expressions are rejected.
 */
export function parseJsonPath(expression: string): Segment[] {
  const text = expression.trim();
  if (!text.startsWith('$')) throw new Error(`JSONPath "${expression}" must start with "$".`);
  const segments: Segment[] = [];
  let i = 1;
  const readName = (): string => {
    const start = i;
    while (i < text.length && /[^.[\]\s]/.test(text[i])) i++;
    if (i === start) throw new Error(`JSONPath "${expression}": expected a name at position ${start}.`);
    return text.slice(start, i);
  };
  while (i < text.length) {
    if (text.startsWith('..', i)) {
      segments.push({ kind: 'descendants' });
      i += 2;
      if (text[i] === '[') continue;
      const name = readName();
      segments.push(name === '*' ? { kind: 'wildcard' } : { kind: 'name', name });
    } else if (text[i] === '.') {
      i++;
      const name = readName();
      segments.push(name === '*' ? { kind: 'wildcard' } : { kind: 'name', name });
    } else if (text[i] === '[') {
      const close = findClosingBracket(text, i, expression);
      const inner = text.slice(i + 1, close).trim();
      i = close + 1;
      if (inner === '*') segments.push({ kind: 'wildcard' });
      else if (/^-?\d+$/.test(inner)) segments.push({ kind: 'index', index: Number(inner) });
      else if (/^'.*'$|^".*"$/s.test(inner)) {
        segments.push({ kind: 'name', name: inner.slice(1, -1).replace(/\\(['"\\])/g, '$1') });
      } else {
        throw new Error(`JSONPath "${expression}": "[${inner}]" is not supported (only names, indexes and *).`);
      }
    } else {
      throw new Error(`JSONPath "${expression}": unexpected "${text[i]}" at position ${i}.`);
    }
  }
  return segments;
}

function findClosingBracket(text: string, open: number, expression: string): number {
  let quote: string | null = null;
  for (let j = open + 1; j < text.length; j++) {
    const c = text[j];
    if (quote) {
      if (c === '\\') j++;
      else if (c === quote) quote = null;
    } else if (c === "'" || c === '"') quote = c;
    else if (c === ']') return j;
  }
  throw new Error(`JSONPath "${expression}": unclosed "[".`);
}

/** A node found by a JSONPath: its value, plus the container and key to replace or remove it. */
interface Located {
  value: unknown;
  parent: Json | unknown[] | null;
  key: string | number | null;
}

function children(node: Located): Located[] {
  const { value } = node;
  if (Array.isArray(value)) return value.map((v, index) => ({ value: v, parent: value, key: index }));
  if (isObject(value)) return Object.entries(value).map(([key, v]) => ({ value: v, parent: value, key }));
  return [];
}

function descendantsAndSelf(node: Located): Located[] {
  return [node, ...children(node).flatMap(descendantsAndSelf)];
}

export function evaluateJsonPath(root: unknown, expression: string): Located[] {
  let current: Located[] = [{ value: root, parent: null, key: null }];
  for (const segment of parseJsonPath(expression)) {
    const next: Located[] = [];
    for (const node of current) {
      if (segment.kind === 'descendants') next.push(...descendantsAndSelf(node));
      else if (segment.kind === 'wildcard') next.push(...children(node));
      else if (segment.kind === 'index') {
        if (Array.isArray(node.value)) {
          const index = segment.index < 0 ? node.value.length + segment.index : segment.index;
          if (index >= 0 && index < node.value.length) next.push({ value: node.value[index], parent: node.value, key: index });
        }
      } else if (isObject(node.value) && Object.prototype.hasOwnProperty.call(node.value, segment.name)) {
        next.push({ value: node.value[segment.name], parent: node.value, key: segment.name });
      }
    }
    current = next;
  }
  return current;
}

/** Overlay `update` semantics: objects merge recursively; arrays and primitives are replaced. */
function merge(target: Json, update: Json): void {
  for (const [key, value] of Object.entries(update)) {
    const existing = target[key];
    if (isObject(existing) && isObject(value)) merge(existing, value);
    else target[key] = structuredClone(value);
  }
}

export interface OverlayDocument {
  overlay?: string;
  actions?: Array<{ target?: string; update?: unknown; remove?: boolean; description?: string }>;
}

/**
 * Applies the actions of an Overlay 1.0 document in order. `update` merges into every target
 * object, or is appended to a target array; `remove: true` deletes every target. A target that
 * matches nothing is an error, so a stale overlay is noticed when the spec changes.
 */
export function applyOverlay(spec: Json, overlay: OverlayDocument, source: string): void {
  if (!isObject(overlay) || typeof overlay.overlay !== 'string' || !Array.isArray(overlay.actions)) {
    throw new Error(`Overlay "${source}" is not an Overlay document (it needs "overlay" and "actions").`);
  }
  overlay.actions.forEach((action, n) => {
    const where = `Overlay "${source}", action ${n + 1}`;
    if (!isObject(action) || typeof action.target !== 'string') throw new Error(`${where}: "target" is missing.`);
    const found = evaluateJsonPath(spec, action.target);
    if (found.length === 0) throw new Error(`${where}: target "${action.target}" matches nothing in the spec.`);
    if (action.remove === true) {
      // Remove from the end so array indexes found earlier stay valid.
      for (const node of [...found].reverse()) {
        if (node.parent === null) throw new Error(`${where}: the root of the spec cannot be removed.`);
        if (Array.isArray(node.parent)) node.parent.splice(node.key as number, 1);
        else delete node.parent[node.key as string];
      }
      return;
    }
    if (action.update === undefined) throw new Error(`${where}: it has neither "update" nor "remove: true".`);
    for (const node of found) {
      if (Array.isArray(node.value)) node.value.push(structuredClone(action.update));
      else if (isObject(node.value) && isObject(action.update)) merge(node.value, action.update);
      else if (node.parent === null) throw new Error(`${where}: the root can only be merged with an object.`);
      else if (Array.isArray(node.parent)) node.parent[node.key as number] = structuredClone(action.update);
      else node.parent[node.key as string] = structuredClone(action.update);
    }
  });
}

// ---------------------------------------------------------------------------------------------
// Derived operationIds
// ---------------------------------------------------------------------------------------------

/**
 * Gives every operation without an `operationId` one derived from its path with `prefix` removed
 * (`/api` turns `get /api/pets/{id}` into `get_pets_id`, not `get_api_pets_id`). Operations that
 * have an `operationId` keep it. Two operations that end up with the same id are an error.
 */
export function deriveOperationIds(spec: Json, prefix: string): void {
  const normalized = '/' + prefix.replace(/^\/+|\/+$/g, '');
  const paths = isObject(spec['paths']) ? spec['paths'] : {};
  const seen = new Map<string, string>();
  for (const [apiPath, item] of Object.entries(paths)) {
    if (!isObject(item)) continue;
    for (const method of HTTP_METHODS) {
      const op = item[method];
      if (!isObject(op)) continue;
      if (typeof op['operationId'] !== 'string') {
        const stripped =
          apiPath === normalized ? '/' : apiPath.startsWith(normalized + '/') ? apiPath.slice(normalized.length) : apiPath;
        op['operationId'] = fallbackOperationId(method, stripped);
      }
      const id = op['operationId'] as string;
      const where = `${method.toUpperCase()} ${apiPath}`;
      const clash = seen.get(id);
      if (clash) throw new Error(`stripPathPrefix gives ${clash} and ${where} the same operationId "${id}".`);
      seen.set(id, where);
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Operation filters
// ---------------------------------------------------------------------------------------------

interface OperationRef {
  apiPath: string;
  method: string;
  operationId: string;
}

function listOperations(spec: Json): OperationRef[] {
  const result: OperationRef[] = [];
  const paths = isObject(spec['paths']) ? spec['paths'] : {};
  for (const [apiPath, item] of Object.entries(paths)) {
    if (!isObject(item)) continue;
    for (const method of HTTP_METHODS) {
      const op = item[method];
      if (!isObject(op)) continue;
      const operationId = typeof op['operationId'] === 'string' ? op['operationId'] : fallbackOperationId(method, apiPath);
      result.push({ apiPath, method, operationId });
    }
  }
  return result;
}

/** `"GET /pets/{id}"` (any method casing) or an operationId, including the derived one. */
function matches(selector: string, op: OperationRef): boolean {
  const spaced = /^([A-Za-z]+)\s+(\/.*)$/.exec(selector);
  if (spaced) return spaced[1].toLowerCase() === op.method && spaced[2] === op.apiPath;
  return selector === op.operationId;
}

/**
 * Keeps only the operations `include` selects (when given) and drops the ones `exclude` selects.
 * A selector that matches no operation is an error. Path items left without operations are removed.
 */
export function filterOperations(spec: Json, include: string[], exclude: string[]): void {
  const operations = listOperations(spec);
  const unmatched = [...include, ...exclude].filter((s) => !operations.some((op) => matches(s, op)));
  if (unmatched.length > 0) {
    throw new Error(`includeOperations/excludeOperations matched no operation: ${unmatched.join(', ')}`);
  }
  const paths = spec['paths'] as Json;
  for (const op of operations) {
    const keep =
      (include.length === 0 || include.some((s) => matches(s, op))) && !exclude.some((s) => matches(s, op));
    if (keep) continue;
    const item = paths[op.apiPath] as Json;
    delete item[op.method];
    if (!HTTP_METHODS.some((m) => m in item)) delete paths[op.apiPath];
  }
}

// ---------------------------------------------------------------------------------------------
// Security schemes
// ---------------------------------------------------------------------------------------------

/**
 * Drops security schemes: their definitions and their entries in every security requirement. An
 * operation whose alternatives all go then carries no security at all, so its token sends no
 * credentials of its own (an interceptor can still add them). `*` drops every scheme.
 */
export function excludeSecuritySchemes(spec: Json, names: string[]): void {
  const components = isObject(spec['components']) ? spec['components'] : undefined;
  const schemes = components && isObject(components['securitySchemes']) ? components['securitySchemes'] : {};
  const dropAll = names.includes('*');
  const unknown = names.filter((n) => n !== '*' && !(n in schemes));
  if (unknown.length > 0) {
    throw new Error(`excludeSecuritySchemes names unknown schemes: ${unknown.join(', ')} (known: ${Object.keys(schemes).join(', ') || 'none'})`);
  }
  const dropped = new Set(dropAll ? Object.keys(schemes) : names);
  for (const name of dropped) delete schemes[name];
  if (components && Object.keys(schemes).length === 0) delete components['securitySchemes'];

  // A dropped scheme leaves each alternative it was part of; an alternative left with nothing is
  // removed (an alternative that was `{}` from the start, "no credentials", is kept).
  const prune = (requirements: unknown): unknown =>
    Array.isArray(requirements)
      ? requirements.flatMap((req) => {
          if (!isObject(req) || Object.keys(req).length === 0) return [req];
          const kept = Object.fromEntries(Object.entries(req).filter(([k]) => !dropped.has(k)));
          return Object.keys(kept).length > 0 ? [kept] : [];
        })
      : requirements;

  if ('security' in spec) {
    spec['security'] = prune(spec['security']);
    if ((spec['security'] as unknown[]).length === 0) delete spec['security'];
  }
  const paths = isObject(spec['paths']) ? spec['paths'] : {};
  for (const item of Object.values(paths)) {
    if (!isObject(item)) continue;
    for (const method of HTTP_METHODS) {
      const op = item[method];
      if (!isObject(op) || !('security' in op)) continue;
      const before = (op['security'] as unknown[]).length;
      op['security'] = prune(op['security']);
      // An operation that required only dropped schemes now requires none (an empty list).
      if (before > 0 && (op['security'] as unknown[]).length === 0) op['security'] = [];
    }
  }
}

// ---------------------------------------------------------------------------------------------
// All of it, in order
// ---------------------------------------------------------------------------------------------

export interface PreprocessOptions {
  /** Parsed overlay documents with the name to report them by, applied first and in order. */
  overlays?: Array<{ source: string; document: OverlayDocument }>;
  stripPathPrefix?: string;
  includeOperations?: string[];
  excludeOperations?: string[];
  excludeSecuritySchemes?: string[];
}

/**
 * Overlays first (they can add operationIds, fix types or remove anything), then the derived ids,
 * so the operation filters can select by the names the tokens will have, then the schemes.
 */
export function preprocessSpec(spec: Json, options: PreprocessOptions): void {
  for (const { source, document } of options.overlays ?? []) applyOverlay(spec, document, source);
  if (options.stripPathPrefix) deriveOperationIds(spec, options.stripPathPrefix);
  const include = options.includeOperations ?? [];
  const exclude = options.excludeOperations ?? [];
  if (include.length > 0 || exclude.length > 0) filterOperations(spec, include, exclude);
  if (options.excludeSecuritySchemes?.length) excludeSecuritySchemes(spec, options.excludeSecuritySchemes);
}
