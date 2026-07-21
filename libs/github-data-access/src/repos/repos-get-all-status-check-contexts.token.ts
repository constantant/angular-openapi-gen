import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetAllStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['get']['responses']['200']['content']['application/json'];

export type ReposGetAllStatusCheckContextsError =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

function _validateResponse(
  value: unknown,
): ReposGetAllStatusCheckContextsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetAllStatusCheckContexts response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetAllStatusCheckContextsResponse;
}

export const REPOS_GET_ALL_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
  ) => ReturnType<typeof httpResource<ReposGetAllStatusCheckContextsResponse>>
>('REPOS_GET_ALL_STATUS_CHECK_CONTEXTS');

export function provideReposGetAllStatusCheckContexts(): FactoryProvider {
  return {
    provide: REPOS_GET_ALL_STATUS_CHECK_CONTEXTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, branch: string) =>
        httpResource<ReposGetAllStatusCheckContextsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
