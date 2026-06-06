import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetCustomersCustomerCashBalanceParams =
  paths['/v1/customers/{customer}/cash_balance']['get']['parameters']['query'];

type GetCustomersCustomerCashBalanceResponse =
  paths['/v1/customers/{customer}/cash_balance']['get']['responses']['200']['content']['application/json'];

export const GET_CUSTOMERS_CUSTOMER_CASH_BALANCE = new InjectionToken<
  (
    customer: string,
    params?: GetCustomersCustomerCashBalanceParams,
  ) => ReturnType<typeof httpResource<GetCustomersCustomerCashBalanceResponse>>
>('GET_CUSTOMERS_CUSTOMER_CASH_BALANCE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (customer: string, params?: GetCustomersCustomerCashBalanceParams) =>
      httpResource<GetCustomersCustomerCashBalanceResponse>(() => ({
        url: `${base}/v1/customers/${customer}/cash_balance`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
