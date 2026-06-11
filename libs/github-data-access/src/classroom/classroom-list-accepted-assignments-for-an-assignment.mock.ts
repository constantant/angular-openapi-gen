import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT } from './classroom-list-accepted-assignments-for-an-assignment.token';
import type { ClassroomListAcceptedAssignmentsForAnAssignmentResponse } from './classroom-list-accepted-assignments-for-an-assignment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'classroom/list-accepted-assignments-for-an-assignment',
  path: '/assignments/{assignment_id}/accepted_assignments',
  method: 'get',
  tag: 'classroom',
};

export function provideClassroomListAcceptedAssignmentsForAnAssignmentMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomListAcceptedAssignmentsForAnAssignmentResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT,
    'CLASSROOM_LIST_ACCEPTED_ASSIGNMENTS_FOR_AN_ASSIGNMENT',
    initialBehavior,
    _meta,
  );
}
