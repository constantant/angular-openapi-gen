import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

export const DELETE_BOOKING = new InjectionToken<
  (bookingId: string) => ReturnType<typeof httpResource<unknown>>
>('DELETE_BOOKING');

export function provideDeleteBooking(): FactoryProvider {
  return {
    provide: DELETE_BOOKING,
    useFactory: () => {
      const base = inject(TRAVEL_BASE_URL);
      return (bookingId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/bookings/${bookingId}`,
          method: 'DELETE',
        }));
    },
  };
}
