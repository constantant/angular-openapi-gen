import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type DeletePetResponse =
  paths['/pet/{petId}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_PET = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<DeletePetResponse>>
>('DELETE_PET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (petId: string) =>
      httpResource<DeletePetResponse>(() => ({
        url: `${base}/pet/${petId}`,
        method: 'DELETE',
      }));
  },
});
