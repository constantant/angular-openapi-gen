import { pathToFileURL } from 'url';

type Spec = Record<string, unknown>;

const OPERATION_KEYS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch'];

/** True for a Swagger 2.x document (`swagger: "2.0"`). */
export function isSwagger2(spec: Spec): boolean {
  return String(spec['swagger'] ?? '').startsWith('2');
}

/**
 * Pushes the global `produces` / `consumes` of a Swagger 2.0 document down into every operation
 * that doesn't declare its own, then removes the globals. Returns a deep copy.
 *
 * Why: @scalar/openapi-upgrader applies a global `produces` to responses even when an operation
 * overrides it, so a download that declares `produces: [image/png]` came out as
 * `application/json` — which makes the generator type a file download as JSON. With no global
 * `produces` the upgrader honours each operation's own list. (`consumes` already behaves
 * correctly; it is normalised too so the two stay symmetrical.)
 */
export function pushDownMediaTypes(spec: Spec): Spec {
  const copy = structuredClone(spec);
  for (const key of ['produces', 'consumes'] as const) {
    const global = copy[key];
    if (!Array.isArray(global)) continue;
    for (const item of Object.values((copy['paths'] ?? {}) as Record<string, Record<string, unknown>>)) {
      for (const method of OPERATION_KEYS) {
        const operation = item?.[method] as Record<string, unknown> | undefined;
        if (operation && typeof operation === 'object' && operation[key] === undefined) {
          operation[key] = [...global];
        }
      }
    }
    delete copy[key];
  }
  return copy;
}

type Upgrader = { upgradeFromTwoToThree(spec: Spec): Spec };
let upgrader: Promise<Upgrader> | undefined;

// The upgrader is ESM-only and this generator is CommonJS. Node >= 20.19 / 22.12 can `require()` an
// ES module directly, which also works under test runners. Older Node throws ERR_REQUIRE_ESM; there
// fall back to a real dynamic import on the resolved file URL (a TypeScript `import()` would be
// compiled to `require()`, so it goes through `new Function`).
const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<unknown>;

function loadUpgrader(): Promise<Upgrader> {
  upgrader ??= (async () => {
    const resolved = require.resolve('@scalar/openapi-upgrader/2.0-to-3.0');
    try {
      return require(resolved) as Upgrader;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ERR_REQUIRE_ESM') throw e;
      return (await dynamicImport(pathToFileURL(resolved).href)) as Upgrader;
    }
  })();
  return upgrader;
}

/**
 * Converts a Swagger 2.0 document to OpenAPI 3.0 in memory. The input is not modified (the upgrader
 * mutates what it is given, so it gets a copy).
 */
export async function upgradeSwagger2(spec: Spec): Promise<Spec> {
  const { upgradeFromTwoToThree } = await loadUpgrader();
  const upgraded = upgradeFromTwoToThree(pushDownMediaTypes(spec));
  if (!String(upgraded['openapi'] ?? '').startsWith('3')) {
    throw new Error('the upgrader did not produce an OpenAPI 3.x document');
  }
  return upgraded;
}
