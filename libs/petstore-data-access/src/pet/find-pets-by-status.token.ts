import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type FindPetsByStatusParams =
  paths['/pet/findByStatus']['get']['parameters']['query'];

export type FindPetsByStatusResponse =
  paths['/pet/findByStatus']['get']['responses']['200']['content']['application/json'];

export const FIND_PETS_BY_STATUS = new InjectionToken<
  (
    params?:
      | FindPetsByStatusParams
      | (() => FindPetsByStatusParams | undefined),
  ) => ReturnType<typeof httpResource<FindPetsByStatusResponse>>
>('FIND_PETS_BY_STATUS');

export function provideFindPetsByStatus(): FactoryProvider {
  return {
    provide: FIND_PETS_BY_STATUS,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (
        params?:
          | FindPetsByStatusParams
          | (() => FindPetsByStatusParams | undefined),
      ) =>
        httpResource<FindPetsByStatusResponse>(() => ({
          url: `${base}/pet/findByStatus`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
          headers: {
            ...(petstoreAuth?.() != null
              ? { Authorization: `Bearer ${petstoreAuth!()}` }
              : {}),
          },
        }));
    },
  };
}
