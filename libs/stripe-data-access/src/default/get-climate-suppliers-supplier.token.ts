import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetClimateSuppliersSupplierParams =
  paths['/v1/climate/suppliers/{supplier}']['get']['parameters']['query'];

export type GetClimateSuppliersSupplierResponse =
  paths['/v1/climate/suppliers/{supplier}']['get']['responses']['200']['content']['application/json'];

export const GET_CLIMATE_SUPPLIERS_SUPPLIER = new InjectionToken<
  (
    supplier: string,
    params?:
      | GetClimateSuppliersSupplierParams
      | (() => GetClimateSuppliersSupplierParams | undefined),
  ) => ReturnType<typeof httpResource<GetClimateSuppliersSupplierResponse>>
>('GET_CLIMATE_SUPPLIERS_SUPPLIER');

export function provideGetClimateSuppliersSupplier(): FactoryProvider {
  return {
    provide: GET_CLIMATE_SUPPLIERS_SUPPLIER,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        supplier: string,
        params?:
          | GetClimateSuppliersSupplierParams
          | (() => GetClimateSuppliersSupplierParams | undefined),
      ) =>
        httpResource<GetClimateSuppliersSupplierResponse>(() => ({
          url: `${base}/v1/climate/suppliers/${supplier}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
