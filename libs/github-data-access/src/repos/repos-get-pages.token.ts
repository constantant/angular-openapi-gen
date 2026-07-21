import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesResponse =
  paths['/repos/{owner}/{repo}/pages']['get']['responses']['200']['content']['application/json'];

export type ReposGetPagesError =
  paths['/repos/{owner}/{repo}/pages']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'GitHub Pages',
  description: 'The configuration for GitHub Pages for a repository.',
  type: 'object',
  properties: {
    url: {
      type: 'string',
      description: 'The API address for accessing this Page resource.',
      format: 'uri',
      example: 'https://api.github.com/repos/github/hello-world/pages',
    },
    status: {
      type: ['string', 'null'],
      description: 'The status of the most recent build of the Page.',
      example: 'built',
      enum: ['built', 'building', 'errored'],
    },
    cname: {
      description: "The Pages site's custom domain",
      example: 'example.com',
      type: ['string', 'null'],
    },
    protected_domain_state: {
      type: ['string', 'null'],
      description: 'The state if the domain is verified',
      example: 'pending',
      enum: ['pending', 'verified', 'unverified'],
    },
    pending_domain_unverified_at: {
      type: ['string', 'null'],
      description: 'The timestamp when a pending domain becomes unverified.',
      format: 'date-time',
    },
    custom_404: {
      type: 'boolean',
      description: 'Whether the Page has a custom 404 page.',
      example: false,
      default: false,
    },
    html_url: {
      type: 'string',
      description: 'The web address the Page can be accessed from.',
      format: 'uri',
      example: 'https://example.com',
    },
    build_type: {
      type: ['string', 'null'],
      description: 'The process in which the Page will be built.',
      example: 'legacy',
      enum: ['legacy', 'workflow'],
    },
    source: {
      title: 'Pages Source Hash',
      type: 'object',
      properties: {
        branch: {
          type: 'string',
        },
        path: {
          type: 'string',
        },
      },
      required: ['branch', 'path'],
    },
    public: {
      type: 'boolean',
      description:
        'Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site.',
      example: true,
    },
    https_certificate: {
      title: 'Pages Https Certificate',
      type: 'object',
      properties: {
        state: {
          type: 'string',
          enum: [
            'new',
            'authorization_created',
            'authorization_pending',
            'authorized',
            'authorization_revoked',
            'issued',
            'uploaded',
            'approved',
            'errored',
            'bad_authz',
            'destroy_pending',
            'dns_changed',
          ],
          example: 'approved',
        },
        description: {
          type: 'string',
          example: 'Certificate is approved',
        },
        domains: {
          type: 'array',
          items: {
            type: 'string',
          },
          description:
            'Array of the domain set and its alternate name (if it is configured)',
          example: ['example.com', 'www.example.com'],
        },
        expires_at: {
          type: 'string',
          format: 'date',
        },
      },
      required: ['state', 'description', 'domains'],
    },
    https_enforced: {
      type: 'boolean',
      description: 'Whether https is enabled on the domain',
      example: true,
    },
  },
  required: ['url', 'status', 'cname', 'custom_404', 'public'],
};

function _validateResponse(value: unknown): ReposGetPagesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetPages response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetPagesResponse;
}

export const REPOS_GET_PAGES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesResponse>>
>('REPOS_GET_PAGES');

export function provideReposGetPages(): FactoryProvider {
  return {
    provide: REPOS_GET_PAGES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetPagesResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pages`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
