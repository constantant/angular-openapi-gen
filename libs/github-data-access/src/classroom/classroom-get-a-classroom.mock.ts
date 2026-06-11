import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CLASSROOM_GET_A_CLASSROOM } from './classroom-get-a-classroom.token';
import type { ClassroomGetAClassroomResponse } from './classroom-get-a-classroom.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'classroom/get-a-classroom',
  path: '/classrooms/{classroom_id}',
  method: 'get',
  tag: 'classroom',
};

export function provideClassroomGetAClassroomMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomGetAClassroomResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_GET_A_CLASSROOM,
    'CLASSROOM_GET_A_CLASSROOM',
    initialBehavior,
    _meta,
  );
}
