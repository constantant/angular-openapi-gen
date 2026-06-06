import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type InteractionsGetRestrictionsForOrgResponse =
  paths['/orgs/{org}/interaction-limits']['get']['responses']['200']['content']['application/json'];

export const INTERACTIONS_GET_RESTRICTIONS_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<InteractionsGetRestrictionsForOrgResponse>
  >
>('INTERACTIONS_GET_RESTRICTIONS_FOR_ORG');

export function provideInteractionsGetRestrictionsForOrg(): FactoryProvider {
  return {
    provide: INTERACTIONS_GET_RESTRICTIONS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<InteractionsGetRestrictionsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/interaction-limits`,
        }));
    },
  };
}
