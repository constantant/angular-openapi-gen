import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotGetCopilotSeatDetailsForUserResponse =
  paths['/orgs/{org}/members/{username}/copilot']['get']['responses']['200']['content']['application/json'];

export const COPILOT_GET_COPILOT_SEAT_DETAILS_FOR_USER = new InjectionToken<
  (
    org: string,
    username: string,
  ) => ReturnType<
    typeof httpResource<CopilotGetCopilotSeatDetailsForUserResponse>
  >
>('COPILOT_GET_COPILOT_SEAT_DETAILS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, username: string) =>
      httpResource<CopilotGetCopilotSeatDetailsForUserResponse>(() => ({
        url: `${base}/orgs/${org}/members/${username}/copilot`,
      }));
  },
});
