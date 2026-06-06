import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecurityAdvisoriesGetGlobalAdvisoryResponse =
  paths['/advisories/{ghsa_id}']['get']['responses']['200']['content']['application/json'];

export const SECURITY_ADVISORIES_GET_GLOBAL_ADVISORY = new InjectionToken<
  (
    ghsaId: string,
  ) => ReturnType<
    typeof httpResource<SecurityAdvisoriesGetGlobalAdvisoryResponse>
  >
>('SECURITY_ADVISORIES_GET_GLOBAL_ADVISORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (ghsaId: string) =>
      httpResource<SecurityAdvisoriesGetGlobalAdvisoryResponse>(() => ({
        url: `${base}/advisories/${ghsaId}`,
      }));
  },
});
