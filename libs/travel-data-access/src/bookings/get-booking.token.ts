import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { TRAVEL_BASE_URL } from '../api-base-url.token';

type GetBookingResponse =
  paths['/bookings/{bookingId}']['get']['responses']['200']['content']['application/json'];

export const GET_BOOKING = new InjectionToken<
  (bookingId: string) => ReturnType<typeof httpResource<GetBookingResponse>>
>('GET_BOOKING', {
  providedIn: 'root',
  factory: () => {
    const base = inject(TRAVEL_BASE_URL);
    return (bookingId: string) =>
      httpResource<GetBookingResponse>(() => ({
        url: `${base}/bookings/${bookingId}`,
      }));
  },
});
