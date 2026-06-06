import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST = new InjectionToken<
  (
    username: string,
    subjectDigest: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_ATTESTATIONS_BY_SUBJECT_DIGEST', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, subjectDigest: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/users/${username}/attestations/digest/${subjectDigest}`,
        method: 'DELETE',
      }));
  },
});
