import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DISPATCH_EVENT } from './repos-create-dispatch-event.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-dispatch-event',
  path: '/repos/{owner}/{repo}/dispatches',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateDispatchEventMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DISPATCH_EVENT,
    'REPOS_CREATE_DISPATCH_EVENT',
    initialBehavior,
    _meta,
  );
}
