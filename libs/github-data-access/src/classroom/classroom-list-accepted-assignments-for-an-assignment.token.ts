import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ClassroomListAcceptedAssignmentsForAnAssignmentParams =
  paths['/assignments/{assignment_id}/accepted_assignments']['get']['parameters']['query'];

export type ClassroomListAcceptedAssignmentsForAnAssignmentResponse =
  paths['/assignments/{assignment_id}/accepted_assignments']['get']['responses']['200']['content']['application/json'];

export const CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT =
  new InjectionToken<
    (
      assignmentId: string,
      params?:
        | ClassroomListAcceptedAssignmentsForAnAssignmentParams
        | (() =>
            | ClassroomListAcceptedAssignmentsForAnAssignmentParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<ClassroomListAcceptedAssignmentsForAnAssignmentResponse>
    >
  >('CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT');

export function provideClassroomListAcceptedAssignmentsForAnAssignment(): FactoryProvider {
  return {
    provide: CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        assignmentId: string,
        params?:
          | ClassroomListAcceptedAssignmentsForAnAssignmentParams
          | (() =>
              | ClassroomListAcceptedAssignmentsForAnAssignmentParams
              | undefined),
      ) =>
        httpResource<ClassroomListAcceptedAssignmentsForAnAssignmentResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/assignments/${assignmentId}/accepted_assignments`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
