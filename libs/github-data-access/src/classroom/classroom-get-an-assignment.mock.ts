import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CLASSROOM_GET_AN_ASSIGNMENT } from './classroom-get-an-assignment.token';
import type { ClassroomGetAnAssignmentResponse } from './classroom-get-an-assignment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'classroom/get-an-assignment',
  path: '/assignments/{assignment_id}',
  method: 'get',
  tag: 'classroom',
};

export function provideClassroomGetAnAssignmentMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomGetAnAssignmentResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_GET_AN_ASSIGNMENT,
    'CLASSROOM_GET_AN_ASSIGNMENT',
    initialBehavior,
    _meta,
  );
}
