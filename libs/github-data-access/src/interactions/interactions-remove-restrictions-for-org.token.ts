import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<unknown>>
>('INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG');

export function provideInteractionsRemoveRestrictionsForOrg(): FactoryProvider {
  return {
    provide: INTERACTIONS_REMOVE_RESTRICTIONS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/interaction-limits`,
          method: 'DELETE',
        }));
    },
  };
}
