import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITIGNORE_GET_TEMPLATE } from './gitignore-get-template.token';
import type { GitignoreGetTemplateResponse } from './gitignore-get-template.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'gitignore/get-template',
  path: '/gitignore/templates/{name}',
  method: 'get',
  tag: 'gitignore',
};

export function provideGitignoreGetTemplateMock(
  initialBehavior?: ProviderInitialBehavior<GitignoreGetTemplateResponse>,
): FactoryProvider {
  return provideMockResource(
    GITIGNORE_GET_TEMPLATE,
    'GITIGNORE_GET_TEMPLATE',
    initialBehavior,
    _meta,
  );
}
