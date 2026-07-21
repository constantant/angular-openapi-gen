import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposAddStatusCheckContextsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['requestBody']
>['content']['application/json'];

export type ReposAddStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['responses']['200']['content']['application/json'];

export type ReposAddStatusCheckContextsError =
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['responses']['403']['content']['application/json']
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function _validateResponse(
  value: unknown,
): ReposAddStatusCheckContextsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposAddStatusCheckContexts response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposAddStatusCheckContextsResponse;
}

export const REPOS_ADD_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      ReposAddStatusCheckContextsBody | Signal<ReposAddStatusCheckContextsBody>,
  ) => ReturnType<typeof httpResource<ReposAddStatusCheckContextsResponse>>
>('REPOS_ADD_STATUS_CHECK_CONTEXTS');

export function provideReposAddStatusCheckContexts(): FactoryProvider {
  return {
    provide: REPOS_ADD_STATUS_CHECK_CONTEXTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposAddStatusCheckContextsBody
          | Signal<ReposAddStatusCheckContextsBody>,
      ) =>
        httpResource<ReposAddStatusCheckContextsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
