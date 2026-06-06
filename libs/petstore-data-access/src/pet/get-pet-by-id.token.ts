import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type GetPetByIdResponse =
  paths['/pet/{petId}']['get']['responses']['200']['content']['application/json'];

export const GET_PET_BY_ID = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<GetPetByIdResponse>>
>('GET_PET_BY_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (petId: string) =>
      httpResource<GetPetByIdResponse>(() => ({
        url: `${base}/pet/${petId}`,
      }));
  },
});
