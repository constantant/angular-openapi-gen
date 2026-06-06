import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetRepoRulesetVersionResponse =
  paths['/repos/{owner}/{repo}/rulesets/{ruleset_id}/history/{version_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_REPO_RULESET_VERSION = new InjectionToken<
  (
    owner: string,
    repo: string,
    rulesetId: string,
    versionId: string,
  ) => ReturnType<typeof httpResource<ReposGetRepoRulesetVersionResponse>>
>('REPOS_GET_REPO_RULESET_VERSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      rulesetId: string,
      versionId: string,
    ) =>
      httpResource<ReposGetRepoRulesetVersionResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/rulesets/${rulesetId}/history/${versionId}`,
      }));
  },
});
