import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_ORG_RULESET = new InjectionToken<
  (org: string, ruleset_id: string) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_ORG_RULESET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, ruleset_id: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/rulesets/${ruleset_id}`,
        method: 'DELETE',
      }));
  },
});
