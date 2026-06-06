import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomGetAnAssignmentResponse =
  paths['/assignments/{assignment_id}']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_GET_AN_ASSIGNMENT = new InjectionToken<
  (
    assignmentId: string,
  ) => ReturnType<typeof httpResource<ClassroomGetAnAssignmentResponse>>
>('CLASSROOM_GET_AN_ASSIGNMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (assignmentId: string) =>
      httpResource<ClassroomGetAnAssignmentResponse>(() => ({
        url: `${base}/assignments/${assignmentId}`,
      }));
  },
});
