import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetLinkAccountSessionsSessionParams =
  paths['/v1/link_account_sessions/{session}']['get']['parameters']['query'];

type GetLinkAccountSessionsSessionResponse =
  paths['/v1/link_account_sessions/{session}']['get']['responses']['200']['content']['application/json'];

export const GET_LINK_ACCOUNT_SESSIONS_SESSION = new InjectionToken<
  (
    session: string,
    params?: GetLinkAccountSessionsSessionParams,
  ) => ReturnType<typeof httpResource<GetLinkAccountSessionsSessionResponse>>
>('GET_LINK_ACCOUNT_SESSIONS_SESSION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (session: string, params?: GetLinkAccountSessionsSessionParams) =>
      httpResource<GetLinkAccountSessionsSessionResponse>(() => ({
        url: `${base}/v1/link_account_sessions/${session}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
