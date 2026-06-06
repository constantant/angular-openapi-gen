import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_ORG = new InjectionToken<
  (
    org: string,
    spaceNumber: string,
    actorType: string,
    actorIdentifier: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('COPILOT_SPACES_REMOVE_COLLABORATOR_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      spaceNumber: string,
      actorType: string,
      actorIdentifier: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/copilot-spaces/${spaceNumber}/collaborators/${actorType}/${actorIdentifier}`,
        method: 'DELETE',
      }));
  },
});
