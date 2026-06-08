import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CLASSROOM_LIST_CLASSROOMS } from './classroom-list-classrooms.token';
import type { ClassroomListClassroomsResponse } from './classroom-list-classrooms.token';

export function provideClassroomListClassroomsMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomListClassroomsResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_LIST_CLASSROOMS,
    'CLASSROOM_LIST_CLASSROOMS',
    initialBehavior,
  );
}
