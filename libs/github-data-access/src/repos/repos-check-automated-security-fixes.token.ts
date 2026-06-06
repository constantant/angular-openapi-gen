import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCheckAutomatedSecurityFixesResponse =
  paths['/repos/{owner}/{repo}/automated-security-fixes']['get']['responses']['200']['content']['application/json'];

export const REPOS_CHECK_AUTOMATED_SECURITY_FIXES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposCheckAutomatedSecurityFixesResponse>>
>('REPOS_CHECK_AUTOMATED_SECURITY_FIXES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposCheckAutomatedSecurityFixesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/automated-security-fixes`,
      }));
  },
});
