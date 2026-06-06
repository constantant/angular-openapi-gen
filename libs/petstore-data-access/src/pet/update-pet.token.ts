import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type UpdatePetBody = NonNullable<
  paths['/pet']['put']['requestBody']
>['content']['application/json'];

type UpdatePetResponse =
  paths['/pet']['put']['responses']['200']['content']['application/json'];

export const UPDATE_PET = new InjectionToken<
  (
    body: UpdatePetBody | Signal<UpdatePetBody>,
  ) => ReturnType<typeof httpResource<UpdatePetResponse>>
>('UPDATE_PET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (body: UpdatePetBody | Signal<UpdatePetBody>) =>
      httpResource<UpdatePetResponse>(() => ({
        url: `${base}/pet`,
        method: 'PUT',
        body,
      }));
  },
});
