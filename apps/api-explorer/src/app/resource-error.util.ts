import { HttpErrorResponse } from '@angular/common/http';

/**
 * Human-readable message for an `httpResource` `.error()` value. Distinguishes a
 * transport/HTTP failure from a schema-validation failure: generated tokens throw a
 * plain Error from their `_validateResponse` parse hook (when --validateResponses is
 * enabled) when a live response doesn't match its own OpenAPI spec — a backend data
 * problem, not an app bug.
 */
export function describeResourceError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    return error.status
      ? `Request failed (HTTP ${error.status}).`
      : 'Request failed — network error.';
  }
  if (error instanceof Error) {
    return `Backend response doesn't match its own API spec — ${error.message}`;
  }
  return 'API error';
}

/** Logs a resource error to the console with its full detail, labeled by source. */
export function logResourceError(label: string, error: unknown): void {
  console.error(`[${label}] ${describeResourceError(error)}`, error);
}
