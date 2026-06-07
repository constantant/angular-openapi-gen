import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import type { EndpointModel, SecurityKind, SecuritySchemeModel } from './endpoint-model';

const HTTP_METHODS: ReadonlyArray<OpenAPIV3.HttpMethods> = [
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.DELETE,
];

export function toScreamingSnake(str: string): string {
  return str
    .replace(/\//g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[-\s.]+/g, '_')
    .toUpperCase()
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

export function toKebabCase(str: string): string {
  return str
    .replace(/\//g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s.]+/g, '-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseSecuritySchemes(api: OpenAPIV3.Document): SecuritySchemeModel[] {
  const rawSchemes = (api.components?.securitySchemes ?? {}) as Record<
    string,
    OpenAPIV3.SecuritySchemeObject
  >;
  const result: SecuritySchemeModel[] = [];

  for (const [schemeName, scheme] of Object.entries(rawSchemes)) {
    let kind: SecurityKind;
    let apiKeyParamName: string | undefined;

    if (scheme.type === 'http') {
      const httpScheme = (scheme as OpenAPIV3.HttpSecurityScheme).scheme?.toLowerCase();
      kind = httpScheme === 'bearer' ? 'bearer' : httpScheme === 'digest' ? 'digest' : 'basic';
    } else if (scheme.type === 'apiKey') {
      const apiKey = scheme as OpenAPIV3.ApiKeySecurityScheme;
      kind = apiKey.in === 'query' ? 'apiKey-query' : 'apiKey-header';
      apiKeyParamName = apiKey.name;
    } else if (scheme.type === 'oauth2') {
      kind = 'oauth2';
    } else {
      kind = 'openIdConnect';
    }

    result.push({
      schemeName,
      kind,
      apiKeyParamName,
      tokenName: toScreamingSnake(schemeName),
      fileName: toKebabCase(schemeName) + '.security-token',
    });
  }

  return result;
}

export function buildEndpoints(
  api: OpenAPIV3.Document,
  allowedTags: string[] | null,
  namingConvention: 'camel' | 'kebab'
): EndpointModel[] {
  const endpoints: EndpointModel[] = [];
  const globalSecurity = (api.security ?? []) as OpenAPIV3.SecurityRequirementObject[];

  for (const [apiPath, pathItem] of Object.entries(api.paths ?? {})) {
    if (!pathItem) continue;

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method] as OpenAPIV3.OperationObject | undefined;
      if (!operation) continue;

      const tag = operation.tags?.[0] ?? 'default';
      if (allowedTags && !allowedTags.includes(tag)) continue;

      const rawId =
        operation.operationId ??
        `${method}_${apiPath.replace(/\W+/g, '_').replace(/^_|_$/g, '')}`;

      const fileName =
        namingConvention === 'kebab' ? toKebabCase(rawId) : rawId;
      const tokenName = toScreamingSnake(rawId);

      // Operation-level parameters override path-level ones with the same name+in.
      // Merge operation params last so they win, then deduplicate by name.
      const paramMap = new Map<string, OpenAPIV3.ParameterObject>();
      for (const p of [
        ...((pathItem.parameters ?? []) as OpenAPIV3.ParameterObject[]),
        ...((operation.parameters ?? []) as OpenAPIV3.ParameterObject[]),
      ]) {
        paramMap.set(`${p.in}:${p.name}`, p);
      }
      const allParams = [...paramMap.values()];

      const pathParams = allParams
        .filter((p) => p.in === 'path')
        .map((p) => p.name);

      const hasQueryParams = allParams.some((p) => p.in === 'query');

      // Operation-level security overrides global; [] means explicitly no security.
      const operationSecurity = operation.security as
        | OpenAPIV3.SecurityRequirementObject[]
        | undefined;
      const resolvedSecurity =
        operationSecurity !== undefined ? operationSecurity : globalSecurity;
      const securitySchemeNames = [
        ...new Set(resolvedSecurity.flatMap((req) => Object.keys(req))),
      ];

      const requestBody = operation.requestBody as
        | OpenAPIV3.RequestBodyObject
        | undefined;
      const bodyContent = requestBody?.content ?? {};
      const BODY_CONTENT_TYPES = [
        'application/json',
        'application/x-www-form-urlencoded',
        'multipart/form-data',
      ];
      const bodyContentType =
        BODY_CONTENT_TYPES.find((ct) => bodyContent[ct]) ??
        Object.keys(bodyContent)[0] ??
        null;
      const hasBody = bodyContentType !== null;

      // Pick the first 2xx response code that carries application/json content.
      // Covers 200, 201, 202, 206, and the catch-all '2XX' used by some specs.
      const RESPONSE_PRIORITY = ['200', '201', '202', '206', '2XX', '203', '207', '208', '226'];
      const allResponseCodes = Object.keys(operation.responses ?? {});
      const orderedCodes = [
        ...RESPONSE_PRIORITY.filter((c) => allResponseCodes.includes(c)),
        ...allResponseCodes.filter(
          (c) => !RESPONSE_PRIORITY.includes(c) && /^2/.test(c)
        ),
      ];
      const responseStatus =
        orderedCodes.find((code) => {
          const obj = operation.responses?.[code] as OpenAPIV3.ResponseObject | undefined;
          return obj?.content?.['application/json'] != null;
        }) ?? null;
      const hasResponse = responseStatus !== null;

      endpoints.push({
        tag: toKebabCase(tag),
        operationId: rawId,
        method,
        apiPath,
        pathParams,
        tokenName,
        fileName,
        hasQueryParams,
        hasBody,
        hasResponse,
        responseStatus,
        bodyContentType,
        securitySchemeNames,
      });
    }
  }

  return endpoints;
}

/** Convenience wrapper that dereferences the spec before building endpoints. */
export async function parseSpec(
  specPath: string,
  allowedTags: string[] | null,
  namingConvention: 'camel' | 'kebab'
): Promise<EndpointModel[]> {
  const api = (await SwaggerParser.dereference(specPath)) as OpenAPIV3.Document;
  return buildEndpoints(api, allowedTags, namingConvention);
}
