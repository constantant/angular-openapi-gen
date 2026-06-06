import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type UpdatePetWithFormResponse =
  paths['/pet/{petId}']['post']['responses']['200']['content']['application/json'];

export const UPDATE_PET_WITH_FORM = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<UpdatePetWithFormResponse>>
>('UPDATE_PET_WITH_FORM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (petId: string) =>
      httpResource<UpdatePetWithFormResponse>(() => ({
        url: `${base}/pet/${petId}`,
        method: 'POST',
      }));
  },
});
