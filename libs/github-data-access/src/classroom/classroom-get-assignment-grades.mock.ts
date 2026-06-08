import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CLASSROOM_GET_ASSIGNMENT_GRADES } from './classroom-get-assignment-grades.token';
import type { ClassroomGetAssignmentGradesResponse } from './classroom-get-assignment-grades.token';

export function provideClassroomGetAssignmentGradesMock(
  initialBehavior?: ProviderInitialBehavior<ClassroomGetAssignmentGradesResponse>,
): FactoryProvider {
  return provideMockResource(
    CLASSROOM_GET_ASSIGNMENT_GRADES,
    'CLASSROOM_GET_ASSIGNMENT_GRADES',
    initialBehavior,
  );
}
