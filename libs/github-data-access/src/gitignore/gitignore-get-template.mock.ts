import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { GITIGNORE_GET_TEMPLATE } from './gitignore-get-template.token';
import type { GitignoreGetTemplateResponse } from './gitignore-get-template.token';

export function provideGitignoreGetTemplateMock(
  initialBehavior?: ProviderInitialBehavior<GitignoreGetTemplateResponse>,
): FactoryProvider {
  return provideMockResource(
    GITIGNORE_GET_TEMPLATE,
    'GITIGNORE_GET_TEMPLATE',
    initialBehavior,
  );
}
