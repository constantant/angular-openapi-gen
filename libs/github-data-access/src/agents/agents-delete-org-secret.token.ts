import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const AGENTS_DELETE_ORG_SECRET = new InjectionToken<
  (org: string, secretName: string) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_DELETE_ORG_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, secretName: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/agents/secrets/${secretName}`,
        method: 'DELETE',
      }));
  },
});
