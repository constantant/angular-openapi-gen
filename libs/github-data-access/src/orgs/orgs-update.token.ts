import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdateBody = NonNullable<
  paths['/orgs/{org}']['patch']['requestBody']
>['content']['application/json'];

export type OrgsUpdateResponse =
  paths['/orgs/{org}']['patch']['responses']['200']['content']['application/json'];

export const ORGS_UPDATE = new InjectionToken<
  (
    org: string,
    body: OrgsUpdateBody | Signal<OrgsUpdateBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdateResponse>>
>('ORGS_UPDATE');

export function provideOrgsUpdate(): FactoryProvider {
  return {
    provide: ORGS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, body: OrgsUpdateBody | Signal<OrgsUpdateBody>) =>
        httpResource<OrgsUpdateResponse>(() => ({
          url: `${base}/orgs/${org}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
