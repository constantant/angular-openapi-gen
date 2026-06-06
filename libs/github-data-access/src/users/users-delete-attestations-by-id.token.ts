import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersDeleteAttestationsByIdResponse =
  paths['/users/{username}/attestations/{attestation_id}']['delete']['responses']['200']['content']['application/json'];

export const USERS_DELETE_ATTESTATIONS_BY_ID = new InjectionToken<
  (
    username: string,
    attestation_id: string,
  ) => ReturnType<typeof httpResource<UsersDeleteAttestationsByIdResponse>>
>('USERS_DELETE_ATTESTATIONS_BY_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, attestation_id: string) =>
      httpResource<UsersDeleteAttestationsByIdResponse>(() => ({
        url: `${base}/users/${username}/attestations/${attestation_id}`,
        method: 'DELETE',
      }));
  },
});
