import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM } from './classroom-list-assignments-for-a-classroom.token';
import type { ClassroomListAssignmentsForAClassroomResponse } from './classroom-list-assignments-for-a-classroom.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'classroom/list-assignments-for-a-classroom',
  path: '/classrooms/{classroom_id}/assignments',
  method: 'get',
  tag: 'classroom',
};

export function provideClassroomListAssignmentsForAClassroomMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomListAssignmentsForAClassroomResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM,
    'CLASSROOM_LIST_ASSIGNMENTS_FOR_A_CLASSROOM',
    initialBehavior,
    _meta,
  );
}
