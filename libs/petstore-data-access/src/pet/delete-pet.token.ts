import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import {
  splitCallOptions,
  type ResourceCallOptions,
  type ResourceRefFor,
} from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type DeletePetOptions = ResourceCallOptions<unknown>;

export type DeletePetFn = <O extends DeletePetOptions = DeletePetOptions>(
  petId: string,
  apiKey?: string,
  options?: O,
) => ResourceRefFor<unknown, O>;

export const DELETE_PET = new InjectionToken<DeletePetFn>('DELETE_PET');

export function provideDeletePet(): FactoryProvider {
  return {
    provide: DELETE_PET,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return ((petId: string, apiKey?: string, options?: DeletePetOptions) => {
        const _opts = splitCallOptions<unknown>(options);
        return httpResource<unknown>(() => {
          return {
            ..._opts.request,
            url: `${base}/pet/${petId}`,
            method: 'DELETE',
            headers: {
              ...(apiKey != null ? { api_key: apiKey } : {}),
              ...(petstoreAuth?.() != null
                ? { Authorization: `Bearer ${petstoreAuth()}` }
                : {}),
              ..._opts.headers,
            },
          };
        }, _opts.resource);
      }) as DeletePetFn;
    },
  };
}
