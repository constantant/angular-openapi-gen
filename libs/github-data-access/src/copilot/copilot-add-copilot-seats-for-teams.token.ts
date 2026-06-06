import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotAddCopilotSeatsForTeamsBody = NonNullable<
  paths['/orgs/{org}/copilot/billing/selected_teams']['post']['requestBody']
>['content']['application/json'];

export type CopilotAddCopilotSeatsForTeamsResponse =
  paths['/orgs/{org}/copilot/billing/selected_teams']['post']['responses']['201']['content']['application/json'];

export const COPILOT_ADD_COPILOT_SEATS_FOR_TEAMS = new InjectionToken<
  (
    org: string,
    body:
      | CopilotAddCopilotSeatsForTeamsBody
      | Signal<CopilotAddCopilotSeatsForTeamsBody>,
  ) => ReturnType<typeof httpResource<CopilotAddCopilotSeatsForTeamsResponse>>
>('COPILOT_ADD_COPILOT_SEATS_FOR_TEAMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | CopilotAddCopilotSeatsForTeamsBody
        | Signal<CopilotAddCopilotSeatsForTeamsBody>,
    ) =>
      httpResource<CopilotAddCopilotSeatsForTeamsResponse>(() => ({
        url: `${base}/orgs/${org}/copilot/billing/selected_teams`,
        method: 'POST',
        body,
      }));
  },
});
