import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodesOfConductGetConductCodeResponse =
  paths['/codes_of_conduct/{key}']['get']['responses']['200']['content']['application/json'];

export const CODES_OF_CONDUCT_GET_CONDUCT_CODE = new InjectionToken<
  (
    key: string,
  ) => ReturnType<typeof httpResource<CodesOfConductGetConductCodeResponse>>
>('CODES_OF_CONDUCT_GET_CONDUCT_CODE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (key: string) =>
      httpResource<CodesOfConductGetConductCodeResponse>(() => ({
        url: `${base}/codes_of_conduct/${key}`,
      }));
  },
});
