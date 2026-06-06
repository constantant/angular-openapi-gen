import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotCopilotContentExclusionForOrganizationResponse =
  paths['/orgs/{org}/copilot/content_exclusion']['get']['responses']['200']['content']['application/json'];

export const COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<CopilotCopilotContentExclusionForOrganizationResponse>
    >
  >('COPILOT_COPILOT_CONTENT_EXCLUSION_FOR_ORGANIZATION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<CopilotCopilotContentExclusionForOrganizationResponse>(
          () => ({
            url: `${base}/orgs/${org}/copilot/content_exclusion`,
          }),
        );
    },
  });
