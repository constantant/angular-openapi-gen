import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomGetAClassroomResponse =
  paths['/classrooms/{classroom_id}']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_GET_A_CLASSROOM = new InjectionToken<
  (
    classroomId: string,
  ) => ReturnType<typeof httpResource<ClassroomGetAClassroomResponse>>
>('CLASSROOM_GET_A_CLASSROOM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (classroomId: string) =>
      httpResource<ClassroomGetAClassroomResponse>(() => ({
        url: `${base}/classrooms/${classroomId}`,
      }));
  },
});
