import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_LANGUAGES } from './repos-list-languages.token';
import type { ReposListLanguagesResponse } from './repos-list-languages.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-languages',
  path: '/repos/{owner}/{repo}/languages',
  method: 'get',
  tag: 'repos',
};

export function provideReposListLanguagesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListLanguagesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_LANGUAGES,
    'REPOS_LIST_LANGUAGES',
    initialBehavior,
    _meta,
  );
}
