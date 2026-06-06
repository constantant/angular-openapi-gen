import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListAttestationsParams =
  paths['/users/{username}/attestations/{subject_digest}']['get']['parameters']['query'];

export type UsersListAttestationsResponse =
  paths['/users/{username}/attestations/{subject_digest}']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_ATTESTATIONS = new InjectionToken<
  (
    username: string,
    subjectDigest: string,
    params?:
      | UsersListAttestationsParams
      | (() => UsersListAttestationsParams | undefined),
  ) => ReturnType<typeof httpResource<UsersListAttestationsResponse>>
>('USERS_LIST_ATTESTATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      subjectDigest: string,
      params?:
        | UsersListAttestationsParams
        | (() => UsersListAttestationsParams | undefined),
    ) =>
      httpResource<UsersListAttestationsResponse>(() => ({
        url: `${base}/users/${username}/attestations/${subjectDigest}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
