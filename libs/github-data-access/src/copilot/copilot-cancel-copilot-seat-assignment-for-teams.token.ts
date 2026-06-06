import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCancelCopilotSeatAssignmentForTeamsBody = NonNullable<
  paths['/orgs/{org}/copilot/billing/selected_teams']['delete']['requestBody']
>['content']['application/json'];

export type CopilotCancelCopilotSeatAssignmentForTeamsResponse =
  paths['/orgs/{org}/copilot/billing/selected_teams']['delete']['responses']['200']['content']['application/json'];

export const COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS =
  new InjectionToken<
    (
      org: string,
      body:
        | CopilotCancelCopilotSeatAssignmentForTeamsBody
        | Signal<CopilotCancelCopilotSeatAssignmentForTeamsBody>,
    ) => ReturnType<
      typeof httpResource<CopilotCancelCopilotSeatAssignmentForTeamsResponse>
    >
  >('COPILOT_CANCEL_COPILOT_SEAT_ASSIGNMENT_FOR_TEAMS', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotCancelCopilotSeatAssignmentForTeamsBody
          | Signal<CopilotCancelCopilotSeatAssignmentForTeamsBody>,
      ) =>
        httpResource<CopilotCancelCopilotSeatAssignmentForTeamsResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/billing/selected_teams`,
            method: 'DELETE',
            body,
          }),
        );
    },
  });
