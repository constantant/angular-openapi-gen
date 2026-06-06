import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteTaxIdsIdBody = NonNullable<
  paths['/v1/tax_ids/{id}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteTaxIdsIdResponse =
  paths['/v1/tax_ids/{id}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_TAX_IDS_ID = new InjectionToken<
  (
    id: string,
    body: DeleteTaxIdsIdBody | Signal<DeleteTaxIdsIdBody>,
  ) => ReturnType<typeof httpResource<DeleteTaxIdsIdResponse>>
>('DELETE_TAX_IDS_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      id: string,
      body: DeleteTaxIdsIdBody | Signal<DeleteTaxIdsIdBody>,
    ) =>
      httpResource<DeleteTaxIdsIdResponse>(() => ({
        url: `${base}/v1/tax_ids/${id}`,
        method: 'DELETE',
        body,
      }));
  },
});
