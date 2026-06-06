import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitSignatureProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMMIT_SIGNATURE_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCommitSignatureProtectionResponse>
  >
>('REPOS_GET_COMMIT_SIGNATURE_PROTECTION');

export function provideReposGetCommitSignatureProtection(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMIT_SIGNATURE_PROTECTION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetCommitSignatureProtectionResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
        }));
    },
  };
}
