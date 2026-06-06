import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const DEPENDABOT_DELETE_ORG_SECRET = new InjectionToken<
  (org: string, secretName: string) => ReturnType<typeof httpResource<unknown>>
>('DEPENDABOT_DELETE_ORG_SECRET');

export function provideDependabotDeleteOrgSecret(): FactoryProvider {
  return {
    provide: DEPENDABOT_DELETE_ORG_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, secretName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/dependabot/secrets/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
