import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreatePagesDeploymentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pages/deployments']['post']['requestBody']
>['content']['application/json'];

export type ReposCreatePagesDeploymentResponse =
  paths['/repos/{owner}/{repo}/pages/deployments']['post']['responses']['200']['content']['application/json'];

export type ReposCreatePagesDeploymentError =
  | paths['/repos/{owner}/{repo}/pages/deployments']['post']['responses']['400']['content']['application/json']
  | paths['/repos/{owner}/{repo}/pages/deployments']['post']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/pages/deployments']['post']['responses']['422']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'GitHub Pages',
  description: 'The GitHub Pages deployment status.',
  type: 'object',
  properties: {
    id: {
      oneOf: [
        {
          type: 'integer',
        },
        {
          type: 'string',
        },
      ],
      description:
        'The ID of the GitHub Pages deployment. This is the Git SHA of the deployed commit.',
    },
    status_url: {
      type: 'string',
      description: 'The URI to monitor GitHub Pages deployment status.',
      format: 'uri',
      example:
        'https://api.github.com/repos/github/hello-world/pages/deployments/4fd754f7e594640989b406850d0bc8f06a121251',
    },
    page_url: {
      type: 'string',
      description: 'The URI to the deployed GitHub Pages.',
      format: 'uri',
      example: 'hello-world.github.io',
    },
    preview_url: {
      type: 'string',
      description: 'The URI to the deployed GitHub Pages preview.',
      format: 'uri',
      example: 'monalisa-1231a2312sa32-23sda74.drafts.github.io',
    },
  },
  required: ['id', 'status_url', 'page_url'],
};

function _validateResponse(value: unknown): ReposCreatePagesDeploymentResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposCreatePagesDeployment response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposCreatePagesDeploymentResponse;
}

export const REPOS_CREATE_PAGES_DEPLOYMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      ReposCreatePagesDeploymentBody | Signal<ReposCreatePagesDeploymentBody>,
  ) => ReturnType<typeof httpResource<ReposCreatePagesDeploymentResponse>>
>('REPOS_CREATE_PAGES_DEPLOYMENT');

export function provideReposCreatePagesDeployment(): FactoryProvider {
  return {
    provide: REPOS_CREATE_PAGES_DEPLOYMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ReposCreatePagesDeploymentBody
          | Signal<ReposCreatePagesDeploymentBody>,
      ) =>
        httpResource<ReposCreatePagesDeploymentResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pages/deployments`,
            method: 'POST',
            body,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
