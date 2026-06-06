import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DISABLE_AUTOMATED_SECURITY_FIXES = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DISABLE_AUTOMATED_SECURITY_FIXES');

export function provideReposDisableAutomatedSecurityFixes(): FactoryProvider {
  return {
    provide: REPOS_DISABLE_AUTOMATED_SECURITY_FIXES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/automated-security-fixes`,
          method: 'DELETE',
        }));
    },
  };
}
