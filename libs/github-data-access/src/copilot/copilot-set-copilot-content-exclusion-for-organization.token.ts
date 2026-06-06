import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSetCopilotContentExclusionForOrganizationBody = NonNullable<
  paths['/orgs/{org}/copilot/content_exclusion']['put']['requestBody']
>['content']['application/json'];

export type CopilotSetCopilotContentExclusionForOrganizationResponse =
  paths['/orgs/{org}/copilot/content_exclusion']['put']['responses']['200']['content']['application/json'];

export const COPILOT_SET_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
      body:
        | CopilotSetCopilotContentExclusionForOrganizationBody
        | Signal<CopilotSetCopilotContentExclusionForOrganizationBody>,
    ) => ReturnType<
      typeof httpResource<CopilotSetCopilotContentExclusionForOrganizationResponse>
    >
  >('COPILOT_SET_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | CopilotSetCopilotContentExclusionForOrganizationBody
          | Signal<CopilotSetCopilotContentExclusionForOrganizationBody>,
      ) =>
        httpResource<CopilotSetCopilotContentExclusionForOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/content_exclusion`,
            method: 'PUT',
            body,
          }),
        );
    },
  });
