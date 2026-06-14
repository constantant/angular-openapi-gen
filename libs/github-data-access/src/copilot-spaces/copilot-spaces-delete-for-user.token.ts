import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const COPILOT_SPACES_DELETE_FOR_USER = new InjectionToken<
  (
    username: string,
    spaceNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('COPILOT_SPACES_DELETE_FOR_USER');

export function provideCopilotSpacesDeleteForUser(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_DELETE_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string, spaceNumber: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/users/${username}/copilot-spaces/${spaceNumber}`,
          method: 'DELETE',
        }));
    },
  };
}
