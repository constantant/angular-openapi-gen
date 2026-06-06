import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomListClassroomsParams =
  paths['/classrooms']['get']['parameters']['query'];

export type ClassroomListClassroomsResponse =
  paths['/classrooms']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_LIST_CLASSROOMS = new InjectionToken<
  (
    params?:
      | ClassroomListClassroomsParams
      | (() => ClassroomListClassroomsParams | undefined),
  ) => ReturnType<typeof httpResource<ClassroomListClassroomsResponse>>
>('CLASSROOM_LIST_CLASSROOMS');

export function provideClassroomListClassrooms(): FactoryProvider {
  return {
    provide: CLASSROOM_LIST_CLASSROOMS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | ClassroomListClassroomsParams
          | (() => ClassroomListClassroomsParams | undefined),
      ) =>
        httpResource<ClassroomListClassroomsResponse>(() => ({
          url: `${base}/classrooms`,
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
