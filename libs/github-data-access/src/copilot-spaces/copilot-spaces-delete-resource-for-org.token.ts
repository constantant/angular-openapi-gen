import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    spaceResourceId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG');

export function provideCopilotSpacesDeleteResourceForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_DELETE_RESOURCE_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, spaceNumber: string, spaceResourceId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/resources/${spaceResourceId}`,
          method: 'DELETE',
        }));
    },
  };
}
