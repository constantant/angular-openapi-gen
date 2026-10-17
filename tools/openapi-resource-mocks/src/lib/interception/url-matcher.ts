import { pageHref } from './transport-utils';

export interface EndpointRule {
  /** Any casing; compared case-insensitively. */
  method: string;
  /** Absolute (`https://api.example.com/v2`) or relative to the page (`/api`, `''`). */
  baseUrl: string;
  /** OpenAPI path template, e.g. `/pet/{petId}`. */
  path: string;
}

export interface EndpointMatch {
  /** Path-parameter values in the order their placeholders appear in the template. */
  pathParams: string[];
  query: Record<string, string | string[]>;
}

export interface EndpointMatcher {
  /** Number of literal path segments: `/pet/findByStatus` (2) outranks `/pet/{petId}` (1). */
  readonly specificity: number;
  match(method: string, url: string): EndpointMatch | null;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function safeDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export function compileEndpointRule(rule: EndpointRule): EndpointMatcher {
  const method = rule.method.toUpperCase();
  const segments = rule.path.split('/').filter((s) => s.length > 0);
  const isParam = (s: string): boolean => s.startsWith('{') && s.endsWith('}');
  const template = segments.map((s) => (isParam(s) ? '([^/]+)' : escapeRegExp(s))).join('/');

  // The base URL is resolved on every match: a relative one depends on the page location, which
  // is not final while an injected script runs at document start.
  const resolveBase = (): { origin: string; pathname: string } => {
    const base = new URL(rule.baseUrl || '/', pageHref());
    return { origin: base.origin, pathname: base.pathname.replace(/\/+$/, '') };
  };

  return {
    specificity: segments.filter((s) => !isParam(s)).length,
    match(requestMethod, url) {
      if (requestMethod.toUpperCase() !== method) return null;
      let target: URL;
      let base: { origin: string; pathname: string };
      try {
        target = new URL(url, pageHref());
        base = resolveBase();
      } catch {
        return null;
      }
      if (target.origin !== base.origin) return null;
      const pattern = new RegExp(`^${escapeRegExp(base.pathname)}/${template}/?$`);
      const found = pattern.exec(target.pathname);
      if (!found) return null;

      const query: Record<string, string | string[]> = {};
      target.searchParams.forEach((value, name) => {
        const current = query[name];
        if (current === undefined) query[name] = value;
        else if (Array.isArray(current)) current.push(value);
        else query[name] = [current, value];
      });
      return { pathParams: found.slice(1).map(safeDecode), query };
    },
  };
}

/**
 * Whether `url` lies under `prefix` (absolute, or relative to the page): same origin, and a path
 * that starts with the prefix's path. `''` and `'/'` cover the whole origin of the page.
 */
export function isUnderPrefix(prefix: string, url: string): boolean {
  try {
    const base = new URL(prefix || '/', pageHref());
    const target = new URL(url, pageHref());
    return target.origin === base.origin && target.pathname.startsWith(base.pathname);
  } catch {
    return false;
  }
}
