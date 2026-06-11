import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_USING_TEMPLATE } from './repos-create-using-template.token';
import type { ReposCreateUsingTemplateResponse } from './repos-create-using-template.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-using-template',
  path: '/repos/{template_owner}/{template_repo}/generate',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateUsingTemplateMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateUsingTemplateResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_USING_TEMPLATE,
    'REPOS_CREATE_USING_TEMPLATE',
    initialBehavior,
    _meta,
  );
}
