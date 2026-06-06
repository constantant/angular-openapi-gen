import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersDeleteAttestationsBySubjectDigestResponse =
  paths['/users/{username}/attestations/digest/{subject_digest}']['delete']['responses']['200']['content']['application/json'];

export const USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST = new InjectionToken<
  (
    username: string,
    subject_digest: string,
  ) => ReturnType<
    typeof httpResource<UsersDeleteAttestationsBySubjectDigestResponse>
  >
>('USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, subject_digest: string) =>
      httpResource<UsersDeleteAttestationsBySubjectDigestResponse>(() => ({
        url: `${base}/users/${username}/attestations/digest/${subject_digest}`,
        method: 'DELETE',
      }));
  },
});
