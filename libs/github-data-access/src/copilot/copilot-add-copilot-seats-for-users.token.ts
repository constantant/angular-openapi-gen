import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotAddCopilotSeatsForUsersBody = NonNullable<
  paths['/orgs/{org}/copilot/billing/selected_users']['post']['requestBody']
>['content']['application/json'];

export type CopilotAddCopilotSeatsForUsersResponse =
  paths['/orgs/{org}/copilot/billing/selected_users']['post']['responses']['201']['content']['application/json'];

export const COPILOT_ADD_COPILOT_SEATS_FOR_USERS = new InjectionToken<
  (
    org: string,
    body:
      | CopilotAddCopilotSeatsForUsersBody
      | Signal<CopilotAddCopilotSeatsForUsersBody>,
  ) => ReturnType<typeof httpResource<CopilotAddCopilotSeatsForUsersResponse>>
>('COPILOT_ADD_COPILOT_SEATS_FOR_USERS');

export function provideCopilotAddCopilotSeatsForUsers(): FactoryProvider {
  return {
    provide: COPILOT_ADD_COPILOT_SEATS_FOR_USERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotAddCopilotSeatsForUsersBody
          | Signal<CopilotAddCopilotSeatsForUsersBody>,
      ) =>
        httpResource<CopilotAddCopilotSeatsForUsersResponse>(() => ({
          url: `${base}/orgs/${org}/copilot/billing/selected_users`,
          method: 'POST',
          body,
        }));
    },
  };
}
