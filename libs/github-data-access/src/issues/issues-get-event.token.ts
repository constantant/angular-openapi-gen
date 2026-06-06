import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetEventResponse =
  paths['/repos/{owner}/{repo}/issues/events/{event_id}']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET_EVENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    eventId: string,
  ) => ReturnType<typeof httpResource<IssuesGetEventResponse>>
>('ISSUES_GET_EVENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, eventId: string) =>
      httpResource<IssuesGetEventResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/events/${eventId}`,
      }));
  },
});
