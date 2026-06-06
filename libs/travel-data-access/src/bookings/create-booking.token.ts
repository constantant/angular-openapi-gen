import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type CreateBookingBody = NonNullable<
  paths['/bookings']['post']['requestBody']
>['content']['application/json'];

export type CreateBookingResponse =
  paths['/bookings']['post']['responses']['201']['content']['application/json'];

export const CREATE_BOOKING = new InjectionToken<
  (
    body: CreateBookingBody | Signal<CreateBookingBody>,
  ) => ReturnType<typeof httpResource<CreateBookingResponse>>
>('CREATE_BOOKING');

export function provideCreateBooking(): FactoryProvider {
  return {
    provide: CREATE_BOOKING,
    useFactory: () => {
      const base = inject(TRAVEL_BASE_URL);
      return (body: CreateBookingBody | Signal<CreateBookingBody>) =>
        httpResource<CreateBookingResponse>(() => ({
          url: `${base}/bookings`,
          method: 'POST',
          body,
        }));
    },
  };
}
