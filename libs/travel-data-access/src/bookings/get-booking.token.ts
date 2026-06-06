import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export type GetBookingResponse =
  paths['/bookings/{bookingId}']['get']['responses']['200']['content']['application/json'];

export const GET_BOOKING = new InjectionToken<
  (bookingId: string) => ReturnType<typeof httpResource<GetBookingResponse>>
>('GET_BOOKING');

export function provideGetBooking(): FactoryProvider {
  return {
    provide: GET_BOOKING,
    useFactory: () => {
      const base = inject(TRAVEL_BASE_URL);
      return (bookingId: string) =>
        httpResource<GetBookingResponse>(() => ({
          url: `${base}/bookings/${bookingId}`,
        }));
    },
  };
}
