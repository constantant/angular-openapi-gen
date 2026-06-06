import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const SECURITY_ADVISORIES_CREATE_FORK = new InjectionToken<
  (
    owner: string,
    repo: string,
    ghsaId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('SECURITY_ADVISORIES_CREATE_FORK');

export function provideSecurityAdvisoriesCreateFork(): FactoryProvider {
  return {
    provide: SECURITY_ADVISORIES_CREATE_FORK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, ghsaId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/security-advisories/${ghsaId}/forks`,
          method: 'POST',
        }));
    },
  };
}
