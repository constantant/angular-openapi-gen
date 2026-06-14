import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesListCollaboratorsForOrgResponse =
  paths['/orgs/{org}/copilot-spaces/{space_number}/collaborators']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
  ) => ReturnType<
    typeof httpResource<CopilotSpacesListCollaboratorsForOrgResponse>
  >
>('COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG');

export function provideCopilotSpacesListCollaboratorsForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_LIST_COLLABORATORS_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, spaceNumber: string) =>
        httpResource<CopilotSpacesListCollaboratorsForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/collaborators`,
        }));
    },
  };
}
