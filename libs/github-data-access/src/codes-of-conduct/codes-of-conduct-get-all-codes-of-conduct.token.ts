import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodesOfConductGetAllCodesOfConductResponse =
  paths['/codes_of_conduct']['get']['responses']['200']['content']['application/json'];

export const CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT = new InjectionToken<
  () => ReturnType<
    typeof httpResource<CodesOfConductGetAllCodesOfConductResponse>
  >
>('CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT');

export function provideCodesOfConductGetAllCodesOfConduct(): FactoryProvider {
  return {
    provide: CODES_OF_CONDUCT_GET_ALL_CODES_OF_CONDUCT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return () =>
        httpResource<CodesOfConductGetAllCodesOfConductResponse>(() => ({
          url: `${base}/codes_of_conduct`,
        }));
    },
  };
}
