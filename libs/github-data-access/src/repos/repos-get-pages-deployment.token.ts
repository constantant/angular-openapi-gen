import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesDeploymentResponse =
  paths['/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}']['get']['responses']['200']['content']['application/json'];

export type ReposGetPagesDeploymentError =
  paths['/repos/{owner}/{repo}/pages/deployments/{pages_deployment_id}']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'GitHub Pages deployment status',
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'The current status of the deployment.',
      enum: [
        'deployment_in_progress',
        'syncing_files',
        'finished_file_sync',
        'updating_pages',
        'purging_cdn',
        'deployment_cancelled',
        'deployment_failed',
        'deployment_content_failed',
        'deployment_attempt_error',
        'deployment_lost',
        'succeed',
      ],
    },
  },
};

function _validateResponse(value: unknown): ReposGetPagesDeploymentResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetPagesDeployment response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetPagesDeploymentResponse;
}

export const REPOS_GET_PAGES_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    pagesDeploymentId: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesDeploymentResponse>>
>('REPOS_GET_PAGES_DEPLOYMENT');

export function provideReposGetPagesDeployment(): FactoryProvider {
  return {
    provide: REPOS_GET_PAGES_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, pagesDeploymentId: string) =>
        httpResource<ReposGetPagesDeploymentResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pages/deployments/${pagesDeploymentId}`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
