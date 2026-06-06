import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const GISTS_DELETE_COMMENT = new InjectionToken<
  (
    gistId: string,
    commentId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('GISTS_DELETE_COMMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (gistId: string, commentId: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/gists/${gistId}/comments/${commentId}`,
        method: 'DELETE',
      }));
  },
});
