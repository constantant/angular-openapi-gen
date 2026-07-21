import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveStatusCheckContextsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['responses']['200']['content']['application/json'];

export type ReposRemoveStatusCheckContextsError =
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['delete']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function _validateResponse(
  value: unknown,
): ReposRemoveStatusCheckContextsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposRemoveStatusCheckContexts response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposRemoveStatusCheckContextsResponse;
}

export const REPOS_REMOVE_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveStatusCheckContextsBody
      | Signal<ReposRemoveStatusCheckContextsBody>,
  ) => ReturnType<typeof httpResource<ReposRemoveStatusCheckContextsResponse>>
>('REPOS_REMOVE_STATUS_CHECK_CONTEXTS');

export function provideReposRemoveStatusCheckContexts(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_STATUS_CHECK_CONTEXTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposRemoveStatusCheckContextsBody
          | Signal<ReposRemoveStatusCheckContextsBody>,
      ) =>
        httpResource<ReposRemoveStatusCheckContextsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
            method: 'DELETE',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
