import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { API_KEY } from '../api-key.security-token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type GetPetByIdResponse =
  paths['/pet/{petId}']['get']['responses']['200']['content']['application/json'];

export const GET_PET_BY_ID = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<GetPetByIdResponse>>
>('GET_PET_BY_ID');

export function provideGetPetById(): FactoryProvider {
  return {
    provide: GET_PET_BY_ID,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const apiKey = inject(API_KEY, { optional: true });
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (petId: string) =>
        httpResource<GetPetByIdResponse>(() => ({
          url: `${base}/pet/${petId}`,
          headers: {
            ...(apiKey?.() != null ? { api_key: `${apiKey()}` } : {}),
            ...(petstoreAuth?.() != null
              ? { Authorization: `Bearer ${petstoreAuth()}` }
              : {}),
          },
        }));
    },
  };
}
