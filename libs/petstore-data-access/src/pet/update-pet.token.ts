import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type UpdatePetBody = NonNullable<
  paths['/pet']['put']['requestBody']
>['content']['application/json'];

export type UpdatePetResponse =
  paths['/pet']['put']['responses']['200']['content']['application/json'];

export const UPDATE_PET = new InjectionToken<
  (
    body: UpdatePetBody | Signal<UpdatePetBody>,
  ) => ReturnType<typeof httpResource<UpdatePetResponse>>
>('UPDATE_PET');

export function provideUpdatePet(): FactoryProvider {
  return {
    provide: UPDATE_PET,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (body: UpdatePetBody | Signal<UpdatePetBody>) =>
        httpResource<UpdatePetResponse>(() => ({
          url: `${base}/pet`,
          method: 'PUT',
          body,
          headers: {
            ...(petstoreAuth?.() != null
              ? { Authorization: `Bearer ${petstoreAuth!()}` }
              : {}),
          },
        }));
    },
  };
}
