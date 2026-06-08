import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CLASSROOM_GET_A_CLASSROOM } from './classroom-get-a-classroom.token';
import type { ClassroomGetAClassroomResponse } from './classroom-get-a-classroom.token';

export function provideClassroomGetAClassroomMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomGetAClassroomResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_GET_A_CLASSROOM,
    'CLASSROOM_GET_A_CLASSROOM',
    initialBehavior,
  );
}
