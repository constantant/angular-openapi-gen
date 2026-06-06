import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomGetAssignmentGradesResponse =
  paths['/assignments/{assignment_id}/grades']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_GET_ASSIGNMENT_GRADES = new InjectionToken<
  (
    assignmentId: string,
  ) => ReturnType<typeof httpResource<ClassroomGetAssignmentGradesResponse>>
>('CLASSROOM_GET_ASSIGNMENT_GRADES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (assignmentId: string) =>
      httpResource<ClassroomGetAssignmentGradesResponse>(() => ({
        url: `${base}/assignments/${assignmentId}/grades`,
      }));
  },
});
