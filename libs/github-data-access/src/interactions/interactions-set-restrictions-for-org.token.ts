import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type InteractionsSetRestrictionsForOrgBody = NonNullable<
  paths['/orgs/{org}/interaction-limits']['put']['requestBody']
>['content']['application/json'];

export type InteractionsSetRestrictionsForOrgResponse =
  paths['/orgs/{org}/interaction-limits']['put']['responses']['200']['content']['application/json'];

export const INTERACTIONS_SET_RESTRICTIONS_FOR_ORG = new InjectionToken<
  (
    org: string,
    body:
      | InteractionsSetRestrictionsForOrgBody
      | Signal<InteractionsSetRestrictionsForOrgBody>,
  ) => ReturnType<
    typeof httpResource<InteractionsSetRestrictionsForOrgResponse>
  >
>('INTERACTIONS_SET_RESTRICTIONS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | InteractionsSetRestrictionsForOrgBody
        | Signal<InteractionsSetRestrictionsForOrgBody>,
    ) =>
      httpResource<InteractionsSetRestrictionsForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/interaction-limits`,
        method: 'PUT',
        body,
      }));
  },
});
