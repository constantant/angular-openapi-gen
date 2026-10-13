import * as http from '@angular/common/http';

/**
 * `provideHttpClient()` on the XHR backend for specs. Angular 22 made fetch the default and added
 * `withXhr()`; on 20 / 21 XHR is the default and `withXhr` does not exist, so it is looked up.
 */
export function provideXhrHttpClient(): ReturnType<typeof http.provideHttpClient> {
  const withXhr = (http as unknown as { withXhr?: () => http.HttpFeature<http.HttpFeatureKind> }).withXhr;
  return http.provideHttpClient(...(withXhr ? [withXhr()] : []));
}
