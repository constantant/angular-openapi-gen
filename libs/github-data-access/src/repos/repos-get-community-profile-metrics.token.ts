import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommunityProfileMetricsResponse =
  paths['/repos/{owner}/{repo}/community/profile']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Community Profile',
  description: 'Community Profile',
  type: 'object',
  properties: {
    health_percentage: {
      type: 'integer',
      example: 100,
    },
    description: {
      type: ['string', 'null'],
      example: 'My first repository on GitHub!',
    },
    documentation: {
      type: ['string', 'null'],
      example: 'example.com',
    },
    files: {
      type: 'object',
      properties: {
        code_of_conduct: {
          title: 'Code Of Conduct Simple',
          description: 'Code of Conduct Simple',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              example:
                'https://api.github.com/repos/github/docs/community/code_of_conduct',
            },
            key: {
              type: 'string',
              example: 'citizen_code_of_conduct',
            },
            name: {
              type: 'string',
              example: 'Citizen Code of Conduct',
            },
            html_url: {
              type: ['string', 'null'],
              format: 'uri',
              example:
                'https://github.com/github/docs/blob/main/CODE_OF_CONDUCT.md',
            },
          },
          required: ['url', 'key', 'name', 'html_url'],
        },
        code_of_conduct_file: {
          title: 'Community Health File',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['url', 'html_url'],
        },
        license: {
          title: 'License Simple',
          description: 'License Simple',
          type: ['object', 'null'],
          properties: {
            key: {
              type: 'string',
              example: 'mit',
            },
            name: {
              type: 'string',
              example: 'MIT License',
            },
            url: {
              type: ['string', 'null'],
              format: 'uri',
              example: 'https://api.github.com/licenses/mit',
            },
            spdx_id: {
              type: ['string', 'null'],
              example: 'MIT',
            },
            node_id: {
              type: 'string',
              example: 'MDc6TGljZW5zZW1pdA==',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['key', 'name', 'url', 'spdx_id', 'node_id'],
        },
        contributing: {
          title: 'Community Health File',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['url', 'html_url'],
        },
        readme: {
          title: 'Community Health File',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['url', 'html_url'],
        },
        issue_template: {
          title: 'Community Health File',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['url', 'html_url'],
        },
        pull_request_template: {
          title: 'Community Health File',
          type: ['object', 'null'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
            },
            html_url: {
              type: 'string',
              format: 'uri',
            },
          },
          required: ['url', 'html_url'],
        },
      },
      required: [
        'code_of_conduct',
        'code_of_conduct_file',
        'license',
        'contributing',
        'readme',
        'issue_template',
        'pull_request_template',
      ],
    },
    updated_at: {
      type: ['string', 'null'],
      format: 'date-time',
      example: '2017-02-28T19:09:29Z',
    },
    content_reports_enabled: {
      type: 'boolean',
      example: true,
    },
  },
  required: [
    'health_percentage',
    'description',
    'documentation',
    'files',
    'updated_at',
  ],
};

function _validateResponse(
  value: unknown,
): ReposGetCommunityProfileMetricsResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetCommunityProfileMetrics response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetCommunityProfileMetricsResponse;
}

export const REPOS_GET_COMMUNITY_PROFILE_METRICS = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetCommunityProfileMetricsResponse>>
>('REPOS_GET_COMMUNITY_PROFILE_METRICS');

export function provideReposGetCommunityProfileMetrics(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMUNITY_PROFILE_METRICS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetCommunityProfileMetricsResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/community/profile`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
