import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type AddPetBody = NonNullable<
  paths['/pet']['post']['requestBody']
>['content']['application/json'];

export type AddPetResponse =
  paths['/pet']['post']['responses']['200']['content']['application/json'];

export const ADD_PET = new InjectionToken<
  (
    body: AddPetBody | Signal<AddPetBody>,
  ) => ReturnType<typeof httpResource<AddPetResponse>>
>('ADD_PET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (body: AddPetBody | Signal<AddPetBody>) =>
      httpResource<AddPetResponse>(() => ({
        url: `${base}/pet`,
        method: 'POST',
        body,
      }));
  },
});
