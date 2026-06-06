import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsGetResponse =
  paths['/gists/{gist_id}']['get']['responses']['200']['content']['application/json'];

export const GISTS_GET = new InjectionToken<
  (gistId: string) => ReturnType<typeof httpResource<GistsGetResponse>>
>('GISTS_GET');

export function provideGistsGet(): FactoryProvider {
  return {
    provide: GISTS_GET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (gistId: string) =>
        httpResource<GistsGetResponse>(() => ({
          url: `${base}/gists/${gistId}`,
        }));
    },
  };
}
