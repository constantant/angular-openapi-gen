import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { trackResource } from '../mock-hook';

export const REPOS_ENABLE_AUTOMATED_SECURITY_FIXES = new InjectionToken<
  (owner: string, repo: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_ENABLE_AUTOMATED_SECURITY_FIXES');

export function provideReposEnableAutomatedSecurityFixes(): FactoryProvider {
  return {
    provide: REPOS_ENABLE_AUTOMATED_SECURITY_FIXES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        trackResource(
          'REPOS_ENABLE_AUTOMATED_SECURITY_FIXES',
          httpResource<unknown>(() => ({
            url: `${base}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/automated-security-fixes`,
            method: 'PUT',
          })),
        );
    },
  };
}
