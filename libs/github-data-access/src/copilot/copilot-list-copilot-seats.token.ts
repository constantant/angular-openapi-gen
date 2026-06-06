import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotListCopilotSeatsParams =
  paths['/orgs/{org}/copilot/billing/seats']['get']['parameters']['query'];

export type CopilotListCopilotSeatsResponse =
  paths['/orgs/{org}/copilot/billing/seats']['get']['responses']['200']['content']['application/json'];

export const COPILOT_LIST_COPILOT_SEATS = new InjectionToken<
  (
    org: string,
    params?:
      | CopilotListCopilotSeatsParams
      | (() => CopilotListCopilotSeatsParams | undefined),
  ) => ReturnType<typeof httpResource<CopilotListCopilotSeatsResponse>>
>('COPILOT_LIST_COPILOT_SEATS');

export function provideCopilotListCopilotSeats(): FactoryProvider {
  return {
    provide: COPILOT_LIST_COPILOT_SEATS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CopilotListCopilotSeatsParams
          | (() => CopilotListCopilotSeatsParams | undefined),
      ) =>
        httpResource<CopilotListCopilotSeatsResponse>(() => ({
          url: `${base}/orgs/${org}/copilot/billing/seats`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
