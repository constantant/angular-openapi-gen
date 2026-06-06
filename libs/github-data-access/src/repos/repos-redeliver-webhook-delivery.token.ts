import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_REDELIVER_WEBHOOK_DELIVERY = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
    delivery_id: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_REDELIVER_WEBHOOK_DELIVERY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      hook_id: string,
      delivery_id: string,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}/deliveries/${delivery_id}/attempts`,
        method: 'POST',
      }));
  },
});
