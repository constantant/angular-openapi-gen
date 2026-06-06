import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsUpdateBody = NonNullable<
  paths['/gists/{gist_id}']['patch']['requestBody']
>['content']['application/json'];

export type GistsUpdateResponse =
  paths['/gists/{gist_id}']['patch']['responses']['200']['content']['application/json'];

export const GISTS_UPDATE = new InjectionToken<
  (
    gistId: string,
    body: GistsUpdateBody | Signal<GistsUpdateBody>,
  ) => ReturnType<typeof httpResource<GistsUpdateResponse>>
>('GISTS_UPDATE');

export function provideGistsUpdate(): FactoryProvider {
  return {
    provide: GISTS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        gistId: string,
        body: GistsUpdateBody | Signal<GistsUpdateBody>,
      ) =>
        httpResource<GistsUpdateResponse>(() => ({
          url: `${base}/gists/${gistId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
