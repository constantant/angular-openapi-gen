import type { ObservedRequest } from './mock-entry';

export interface BaseUrlSuggestion {
  baseUrl: string;
  /** How many operations of the spec were seen being requested under `baseUrl`. */
  operations: number;
}

interface Operation {
  method: string;
  path: string;
}

const MAX_SUGGESTIONS = 3;

/**
 * The operation a request belongs to when the API is served under `baseUrl`: same method, and the
 * path after the base URL fits the template. Of several templates the most literal one wins
 * (`/pet/findByStatus` over `/pet/{petId}`). A relative `baseUrl` (`/api`) is compared with the
 * request's path only, since the panel does not know which origin the page resolves it against.
 */
export function findOperation<T extends Operation>(
  operations: readonly T[],
  baseUrl: string,
  request: ObservedRequest,
): T | undefined {
  let target: URL;
  try {
    target = new URL(request.url);
  } catch {
    return undefined;
  }
  const base = baseUrl.replace(/\/+$/, '');
  const absolute = /^https?:\/\//i.test(base);
  const subject = absolute ? target.origin + target.pathname : target.pathname;
  if (!subject.toLowerCase().startsWith(base.toLowerCase())) return undefined;
  const rest = subject.slice(base.length).replace(/\/+$/, '');
  const method = request.method.toUpperCase();

  let best: { operation: T; literals: number } | undefined;
  for (const operation of operations) {
    if (operation.method.toUpperCase() !== method) continue;
    const segments = operation.path.split('/').filter((s) => s.length > 0);
    const isParam = (s: string): boolean => s.startsWith('{') && s.endsWith('}');
    const template = segments.map((s) => (isParam(s) ? '[^/]+' : escapeRegExp(s))).join('/');
    if (!new RegExp(`^/${template}$`).test(rest)) continue;
    const literals = segments.filter((s) => !isParam(s)).length;
    if (!best || literals > best.literals) best = { operation, literals };
  }
  return best?.operation;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Works out where a spec's API is served from the requests the page was seen making: a request
 * whose path ends with one of the spec's path templates (same method) votes for whatever precedes
 * it — `GET https://api.test/v3/pet/7` against `/pet/{petId}` votes for `https://api.test/v3`.
 * Candidates are ranked by the number of distinct operations that voted for them.
 *
 * Templates without a literal segment (`/{id}`) are ignored: they would match every request.
 */
export function suggestBaseUrls(
  operations: readonly Operation[],
  observed: readonly ObservedRequest[],
): BaseUrlSuggestion[] {
  const compiled = operations.flatMap((operation, index) => {
    const segments = operation.path.split('/').filter((s) => s.length > 0);
    const isParam = (s: string): boolean => s.startsWith('{') && s.endsWith('}');
    const literals = segments.filter((s) => !isParam(s)).length;
    if (literals === 0) return [];
    const template = segments.map((s) => (isParam(s) ? '[^/]+' : escapeRegExp(s))).join('/');
    return [{ index, literals, method: operation.method.toUpperCase(), pattern: new RegExp(`^(.*)/${template}/?$`) }];
  });

  const votes = new Map<string, Set<number>>();
  for (const request of observed) {
    let target: URL;
    try {
      target = new URL(request.url);
    } catch {
      continue;
    }
    const method = request.method.toUpperCase();
    // Under one base URL a request is one operation: the most literal template that fits it
    // (`/pet/findByStatus`, not also `/pet/{petId}`).
    const best = new Map<string, { index: number; literals: number }>();
    for (const operation of compiled) {
      if (operation.method !== method) continue;
      const found = operation.pattern.exec(target.pathname);
      if (!found) continue;
      const baseUrl = target.origin + found[1];
      const current = best.get(baseUrl);
      if (!current || operation.literals > current.literals) best.set(baseUrl, operation);
    }
    for (const [baseUrl, operation] of best) {
      let voters = votes.get(baseUrl);
      if (!voters) votes.set(baseUrl, (voters = new Set()));
      voters.add(operation.index);
    }
  }

  return [...votes]
    .map(([baseUrl, voters]) => ({ baseUrl, operations: voters.size }))
    .sort((a, b) => b.operations - a.operations || a.baseUrl.length - b.baseUrl.length)
    .slice(0, MAX_SUGGESTIONS);
}
