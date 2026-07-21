import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetPagesHealthCheckResponse =
  | paths['/repos/{owner}/{repo}/pages/health']['get']['responses']['200']['content']['application/json']
  | paths['/repos/{owner}/{repo}/pages/health']['get']['responses']['202']['content']['application/json'];

export type ReposGetPagesHealthCheckError =
  paths['/repos/{owner}/{repo}/pages/health']['get']['responses']['404']['content']['application/json'];

const _responseSchema: Schema = {
  title: 'Pages Health Check Status',
  description: 'Pages Health Check Status',
  type: 'object',
  properties: {
    domain: {
      type: 'object',
      properties: {
        host: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
        nameservers: {
          type: 'string',
        },
        dns_resolves: {
          type: 'boolean',
        },
        is_proxied: {
          type: ['boolean', 'null'],
        },
        is_cloudflare_ip: {
          type: ['boolean', 'null'],
        },
        is_fastly_ip: {
          type: ['boolean', 'null'],
        },
        is_old_ip_address: {
          type: ['boolean', 'null'],
        },
        is_a_record: {
          type: ['boolean', 'null'],
        },
        has_cname_record: {
          type: ['boolean', 'null'],
        },
        has_mx_records_present: {
          type: ['boolean', 'null'],
        },
        is_valid_domain: {
          type: 'boolean',
        },
        is_apex_domain: {
          type: 'boolean',
        },
        should_be_a_record: {
          type: ['boolean', 'null'],
        },
        is_cname_to_github_user_domain: {
          type: ['boolean', 'null'],
        },
        is_cname_to_pages_dot_github_dot_com: {
          type: ['boolean', 'null'],
        },
        is_cname_to_fastly: {
          type: ['boolean', 'null'],
        },
        is_pointed_to_github_pages_ip: {
          type: ['boolean', 'null'],
        },
        is_non_github_pages_ip_present: {
          type: ['boolean', 'null'],
        },
        is_pages_domain: {
          type: 'boolean',
        },
        is_served_by_pages: {
          type: ['boolean', 'null'],
        },
        is_valid: {
          type: 'boolean',
        },
        reason: {
          type: ['string', 'null'],
        },
        responds_to_https: {
          type: 'boolean',
        },
        enforces_https: {
          type: 'boolean',
        },
        https_error: {
          type: ['string', 'null'],
        },
        is_https_eligible: {
          type: ['boolean', 'null'],
        },
        caa_error: {
          type: ['string', 'null'],
        },
      },
    },
    alt_domain: {
      type: ['object', 'null'],
      properties: {
        host: {
          type: 'string',
        },
        uri: {
          type: 'string',
        },
        nameservers: {
          type: 'string',
        },
        dns_resolves: {
          type: 'boolean',
        },
        is_proxied: {
          type: ['boolean', 'null'],
        },
        is_cloudflare_ip: {
          type: ['boolean', 'null'],
        },
        is_fastly_ip: {
          type: ['boolean', 'null'],
        },
        is_old_ip_address: {
          type: ['boolean', 'null'],
        },
        is_a_record: {
          type: ['boolean', 'null'],
        },
        has_cname_record: {
          type: ['boolean', 'null'],
        },
        has_mx_records_present: {
          type: ['boolean', 'null'],
        },
        is_valid_domain: {
          type: 'boolean',
        },
        is_apex_domain: {
          type: 'boolean',
        },
        should_be_a_record: {
          type: ['boolean', 'null'],
        },
        is_cname_to_github_user_domain: {
          type: ['boolean', 'null'],
        },
        is_cname_to_pages_dot_github_dot_com: {
          type: ['boolean', 'null'],
        },
        is_cname_to_fastly: {
          type: ['boolean', 'null'],
        },
        is_pointed_to_github_pages_ip: {
          type: ['boolean', 'null'],
        },
        is_non_github_pages_ip_present: {
          type: ['boolean', 'null'],
        },
        is_pages_domain: {
          type: 'boolean',
        },
        is_served_by_pages: {
          type: ['boolean', 'null'],
        },
        is_valid: {
          type: 'boolean',
        },
        reason: {
          type: ['string', 'null'],
        },
        responds_to_https: {
          type: 'boolean',
        },
        enforces_https: {
          type: 'boolean',
        },
        https_error: {
          type: ['string', 'null'],
        },
        is_https_eligible: {
          type: ['boolean', 'null'],
        },
        caa_error: {
          type: ['string', 'null'],
        },
      },
    },
  },
};

function _validateResponse(value: unknown): ReposGetPagesHealthCheckResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetPagesHealthCheck response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetPagesHealthCheckResponse;
}

export const REPOS_GET_PAGES_HEALTH_CHECK = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesHealthCheckResponse>>
>('REPOS_GET_PAGES_HEALTH_CHECK');

export function provideReposGetPagesHealthCheck(): FactoryProvider {
  return {
    provide: REPOS_GET_PAGES_HEALTH_CHECK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<ReposGetPagesHealthCheckResponse>(
          () => ({
            url: `${base}/repos/${owner}/${repo}/pages/health`,
          }),
          { parse: _validateResponse },
        );
    },
  };
}
