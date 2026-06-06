import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import type { EndpointModel } from './endpoint-model';

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

export function buildEndpoints(
  api: OpenAPIV3.Document,
  allowedTags: string[] | null,
  namingConvention: 'camel' | 'kebab'
): EndpointModel[] {
  const endpoints: EndpointModel[] = [];

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

      const rawStatus = operation.responses?.['200']
        ? '200'
        : operation.responses?.['201']
          ? '201'
          : null;
      // Only treat the response as typed JSON when the response actually has
      // application/json content (not PDF, octet-stream, etc.)
      const responseObj = rawStatus
        ? (operation.responses?.[rawStatus] as OpenAPIV3.ResponseObject | undefined)
        : null;
      const responseStatus =
        responseObj?.content?.['application/json'] ? rawStatus : null;
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
