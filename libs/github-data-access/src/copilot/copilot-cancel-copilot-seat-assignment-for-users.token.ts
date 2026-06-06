import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCancelCopilotSeatAssignmentForUsersBody = NonNullable<
  paths['/orgs/{org}/copilot/billing/selected_users']['delete']['requestBody']
>['content']['application/json'];

export type CopilotCancelCopilotSeatAssignmentForUsersResponse =
  paths['/orgs/{org}/copilot/billing/selected_users']['delete']['responses']['200']['content']['application/json'];

export const COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_USERS =
  new InjectionToken<
    (
      org: string,
      body:
        | CopilotCancelCopilotSeatAssignmentForUsersBody
        | Signal<CopilotCancelCopilotSeatAssignmentForUsersBody>,
    ) => ReturnType<
      typeof httpResource<CopilotCancelCopilotSeatAssignmentForUsersResponse>
    >
  >('COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_USERS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotCancelCopilotSeatAssignmentForUsersBody
          | Signal<CopilotCancelCopilotSeatAssignmentForUsersBody>,
      ) =>
        httpResource<CopilotCancelCopilotSeatAssignmentForUsersResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/billing/selected_users`,
            method: 'DELETE',
            body,
          }),
        );
    },
  });
