import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_USING_TEMPLATE } from './repos-create-using-template.token';
import type { ReposCreateUsingTemplateResponse } from './repos-create-using-template.token';

export function provideReposCreateUsingTemplateMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateUsingTemplateResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_USING_TEMPLATE,
    'REPOS_CREATE_USING_TEMPLATE',
    initialBehavior,
  );
}
