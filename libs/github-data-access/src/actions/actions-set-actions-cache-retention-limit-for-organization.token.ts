import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetActionsCacheRetentionLimitForOrganizationBody =
  NonNullable<
    paths['/organizations/{org}/actions/cache/retention-limit']['put']['requestBody']
  >['content']['application/json'];

export const ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | ActionsSetActionsCacheRetentionLimitForOrganizationBody
        | Signal<ActionsSetActionsCacheRetentionLimitForOrganizationBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION');

export function provideActionsSetActionsCacheRetentionLimitForOrganization(): FactoryProvider {
  return {
    provide: ACTIONS_SET_ACTIONS_CACHE_RETENTION_LIMIT_FOR_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | ActionsSetActionsCacheRetentionLimitForOrganizationBody
          | Signal<ActionsSetActionsCacheRetentionLimitForOrganizationBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/organizations/${org}/actions/cache/retention-limit`,
          method: 'PUT',
          body,
        }));
    },
  };
}
