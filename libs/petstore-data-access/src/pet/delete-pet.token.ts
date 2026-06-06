import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const DELETE_PET = new InjectionToken<
  (petId: string) => ReturnType<typeof httpResource<unknown>>
>('DELETE_PET');

export function provideDeletePet(): FactoryProvider {
  return {
    provide: DELETE_PET,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (petId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/pet/${petId}`,
          method: 'DELETE',
        }));
    },
  };
}
