import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposCreateCommitSignatureProtectionResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_signatures']['post']['responses']['200']['content']['application/json'];

export const REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<
    typeof httpResource<ReposCreateCommitSignatureProtectionResponse>
  >
>('REPOS_CREATE_COMMIT_SIGNATURE_PROTECTION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, branch: string) =>
      httpResource<ReposCreateCommitSignatureProtectionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_signatures`,
        method: 'POST',
      }));
  },
});
