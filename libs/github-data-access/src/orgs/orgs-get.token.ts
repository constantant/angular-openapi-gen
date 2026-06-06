import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetResponse =
  paths['/orgs/{org}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<OrgsGetResponse>>
>('ORGS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<OrgsGetResponse>(() => ({
        url: `${base}/orgs/${org}`,
      }));
  },
});
