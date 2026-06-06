import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesCreateForOrgBody = NonNullable<
  paths['/orgs/{org}/copilot-spaces']['post']['requestBody']
>['content']['application/json'];

export type CopilotSpacesCreateForOrgResponse =
  paths['/orgs/{org}/copilot-spaces']['post']['responses']['201']['content']['application/json'];

export const COPILOT_SPACES_CREATE_FOR_ORG = new InjectionToken<
  (
    org: string,
    body: CopilotSpacesCreateForOrgBody | Signal<CopilotSpacesCreateForOrgBody>,
  ) => ReturnType<typeof httpResource<CopilotSpacesCreateForOrgResponse>>
>('COPILOT_SPACES_CREATE_FOR_ORG');

export function provideCopilotSpacesCreateForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_CREATE_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotSpacesCreateForOrgBody
          | Signal<CopilotSpacesCreateForOrgBody>,
      ) =>
        httpResource<CopilotSpacesCreateForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/copilot-spaces`,
          method: 'POST',
          body,
        }));
    },
  };
}
