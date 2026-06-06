import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_REMOVE_OUTSIDE_COLLABORATOR = new InjectionToken<
  (org: string, username: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_REMOVE_OUTSIDE_COLLABORATOR');

export function provideOrgsRemoveOutsideCollaborator(): FactoryProvider {
  return {
    provide: ORGS_REMOVE_OUTSIDE_COLLABORATOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/outside_collaborators/${username}`,
          method: 'DELETE',
        }));
    },
  };
}
