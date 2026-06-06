import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODE_SECURITY_DELETE_CONFIGURATION = new InjectionToken<
  (
    org: string,
    configurationId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SECURITY_DELETE_CONFIGURATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, configurationId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/code-security/configurations/${configurationId}`,
        method: 'DELETE',
      }));
  },
});
