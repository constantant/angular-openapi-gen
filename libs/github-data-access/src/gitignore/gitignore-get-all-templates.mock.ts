import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GITIGNORE_GET_ALL_TEMPLATES } from './gitignore-get-all-templates.token';
import type { GitignoreGetAllTemplatesResponse } from './gitignore-get-all-templates.token';

export function provideGitignoreGetAllTemplatesMock(
  initialBehavior?: ProviderInitialBehavior<GitignoreGetAllTemplatesResponse>,
): FactoryProvider {
  return provideMockResource(
    GITIGNORE_GET_ALL_TEMPLATES,
    'GITIGNORE_GET_ALL_TEMPLATES',
    initialBehavior,
  );
}
