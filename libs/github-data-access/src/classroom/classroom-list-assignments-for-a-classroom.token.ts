import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomListAssignmentsForAClassroomParams =
  paths['/classrooms/{classroom_id}/assignments']['get']['parameters']['query'];

export type ClassroomListAssignmentsForAClassroomResponse =
  paths['/classrooms/{classroom_id}/assignments']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM = new InjectionToken<
  (
    classroomId: string,
    params?:
      | ClassroomListAssignmentsForAClassroomParams
      | (() => ClassroomListAssignmentsForAClassroomParams | undefined),
  ) => ReturnType<
    typeof httpResource<ClassroomListAssignmentsForAClassroomResponse>
  >
>('CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM');

export function provideClassroomListAssignmentsForAClassroom(): FactoryProvider {
  return {
    provide: CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        classroomId: string,
        params?:
          | ClassroomListAssignmentsForAClassroomParams
          | (() => ClassroomListAssignmentsForAClassroomParams | undefined),
      ) =>
        httpResource<ClassroomListAssignmentsForAClassroomResponse>(() => ({
          url: `${base}/classrooms/${classroomId}/assignments`,
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
