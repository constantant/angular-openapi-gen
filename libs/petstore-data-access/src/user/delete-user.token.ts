import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type DeleteUserResponse =
  paths['/user/{username}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_USER = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<DeleteUserResponse>>
>('DELETE_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (username: string) =>
      httpResource<DeleteUserResponse>(() => ({
        url: `${base}/user/${username}`,
        method: 'DELETE',
      }));
  },
});
