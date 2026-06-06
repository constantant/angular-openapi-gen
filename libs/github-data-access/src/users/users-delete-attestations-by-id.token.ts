import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_DELETE_ATTESTATIONS_BY_ID = new InjectionToken<
  (
    username: string,
    attestationId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_ATTESTATIONS_BY_ID');

export function provideUsersDeleteAttestationsById(): FactoryProvider {
  return {
    provide: USERS_DELETE_ATTESTATIONS_BY_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string, attestationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/users/${username}/attestations/${attestationId}`,
          method: 'DELETE',
        }));
    },
  };
}
