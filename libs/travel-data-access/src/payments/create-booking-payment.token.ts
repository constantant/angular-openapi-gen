import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type CreateBookingPaymentBody = NonNullable<
  paths['/bookings/{bookingId}/payment']['post']['requestBody']
>['content']['application/json'];

export type CreateBookingPaymentResponse =
  paths['/bookings/{bookingId}/payment']['post']['responses']['200']['content']['application/json'];

export const CREATE_BOOKING_PAYMENT = new InjectionToken<
  (
    bookingId: string,
    body: CreateBookingPaymentBody | Signal<CreateBookingPaymentBody>,
  ) => ReturnType<typeof httpResource<CreateBookingPaymentResponse>>
>('CREATE_BOOKING_PAYMENT');

export function provideCreateBookingPayment(): FactoryProvider {
  return {
    provide: CREATE_BOOKING_PAYMENT,
    useFactory: () => {
      const base = inject(TRAVEL_BASE_URL);
      return (
        bookingId: string,
        body: CreateBookingPaymentBody | Signal<CreateBookingPaymentBody>,
      ) =>
        httpResource<CreateBookingPaymentResponse>(() => ({
          url: `${base}/bookings/${bookingId}/payment`,
          method: 'POST',
          body,
        }));
    },
  };
}
