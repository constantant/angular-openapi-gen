import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { FIND_PETS_BY_TAGS } from './find-pets-by-tags.token';
import type { FindPetsByTagsResponse } from './find-pets-by-tags.token';

export function provideFindPetsByTagsMock(
  initialBehavior?: ProviderInitialBehavior<FindPetsByTagsResponse>,
): FactoryProvider {
  return provideMockResource(
    FIND_PETS_BY_TAGS,
    'FIND_PETS_BY_TAGS',
    initialBehavior,
  );
}
