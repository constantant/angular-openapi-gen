import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type FindPetsByTagsParams =
  paths['/pet/findByTags']['get']['parameters']['query'];

export type FindPetsByTagsResponse =
  paths['/pet/findByTags']['get']['responses']['200']['content']['application/json'];

export const FIND_PETS_BY_TAGS = new InjectionToken<
  (
    params?: FindPetsByTagsParams | (() => FindPetsByTagsParams | undefined),
  ) => ReturnType<typeof httpResource<FindPetsByTagsResponse>>
>('FIND_PETS_BY_TAGS');

export function provideFindPetsByTags(): FactoryProvider {
  return {
    provide: FIND_PETS_BY_TAGS,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (
        params?:
          | FindPetsByTagsParams
          | (() => FindPetsByTagsParams | undefined),
      ) =>
        httpResource<FindPetsByTagsResponse>(() => ({
          url: `${base}/pet/findByTags`,
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
