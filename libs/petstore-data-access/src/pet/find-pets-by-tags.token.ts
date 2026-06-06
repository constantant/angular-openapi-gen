import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type FindPetsByTagsParams =
  paths['/pet/findByTags']['get']['parameters']['query'];

type FindPetsByTagsResponse =
  paths['/pet/findByTags']['get']['responses']['200']['content']['application/json'];

export const FIND_PETS_BY_TAGS = new InjectionToken<
  (
    params?: FindPetsByTagsParams,
  ) => ReturnType<typeof httpResource<FindPetsByTagsResponse>>
>('FIND_PETS_BY_TAGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (params?: FindPetsByTagsParams) =>
      httpResource<FindPetsByTagsResponse>(() => ({
        url: `${base}/pet/findByTags`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
