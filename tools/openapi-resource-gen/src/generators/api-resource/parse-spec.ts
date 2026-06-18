import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import type { DateField, DiscriminatorModel, DiscriminatorVariant, EndpointModel, SecurityKind, SecuritySchemeModel, SpecialQueryParam, WebhookModel } from './endpoint-model';

const HTTP_METHODS: ReadonlyArray<OpenAPIV3.HttpMethods> = [
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.DELETE,
];

/** Content types that Angular's HttpClient handles natively (no special body wrapping). */
const KNOWN_BODY_CONTENT_TYPES = [
  'application/json',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
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

const RESPONSE_PRIORITY_CODES = ['200', '201', '202', '206', '2XX', '203', '207', '208', '226'];

function extractDiscriminatorFromSchema(
  schema: OpenAPIV3.SchemaObject | null | undefined,
  isArrayResponse: boolean
): DiscriminatorModel | null {
  if (!schema?.discriminator?.propertyName) return null;

  const { propertyName, mapping } = schema.discriminator;
  const variants: DiscriminatorVariant[] = [];

  if (mapping) {
    for (const [key, ref] of Object.entries(mapping)) {
      const schemaName = ref.split('/').pop();
      if (schemaName) variants.push({ key, schemaName });
    }
  }

  // Fallback: look for enum values on the discriminator property in each oneOf/anyOf variant.
  if (variants.length === 0) {
    const subschemas = [
      ...((schema.oneOf ?? []) as OpenAPIV3.SchemaObject[]),
      ...((schema.anyOf ?? []) as OpenAPIV3.SchemaObject[]),
    ];
    for (const sub of subschemas) {
      const discProp = sub.properties?.[propertyName] as OpenAPIV3.SchemaObject | undefined;
      const enumVal = discProp?.enum?.[0];
      if (enumVal !== undefined) variants.push({ key: String(enumVal) });
    }
  }

  return variants.length > 0 ? { propertyName, variants, isArrayResponse } : null;
}

/** Collect top-level properties with format:date-time or format:date from a schema object. */
function collectDateFields(schema: OpenAPIV3.SchemaObject | null | undefined): DateField[] {
  if (!schema?.properties) return [];
  return Object.entries(schema.properties)
    .filter(([, prop]) => {
      const s = prop as OpenAPIV3.SchemaObject;
      return s.type === 'string' && (s.format === 'date-time' || s.format === 'date');
    })
    .map(([name, prop]) => ({
      name,
      format: (prop as OpenAPIV3.SchemaObject).format as 'date-time' | 'date',
    }));
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

      const headerParams = allParams
        .filter((p) => p.in === 'header')
        .map((p) => ({ name: p.name, required: p.required === true }));

      const cookieParams = allParams
        .filter((p) => p.in === 'cookie')
        .map((p) => ({ name: p.name, required: p.required === true }));

      const hasQueryParams = allParams.some((p) => p.in === 'query');

      // Collect query params that need non-default serialization.
      // OpenAPI default: form + explode:true (Angular handles arrays natively).
      // deepObject always needs expansion; the delimited styles and form+explode:false need joining.
      const specialQueryParams: SpecialQueryParam[] = allParams
        .filter((p) => p.in === 'query')
        .flatMap((p): SpecialQueryParam[] => {
          const style = (p as { style?: string }).style ?? 'form';
          const defaultExplode = style === 'form';
          const explode = (p as { explode?: boolean }).explode ?? defaultExplode;
          if (style === 'deepObject') return [{ name: p.name, serializer: 'deepObject' }];
          if (style === 'pipeDelimited' && !explode) return [{ name: p.name, serializer: 'pipes' }];
          if (style === 'spaceDelimited' && !explode) return [{ name: p.name, serializer: 'spaces' }];
          if (style === 'form' && !explode) return [{ name: p.name, serializer: 'csv' }];
          return [];
        });

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
      const bodyContentType =
        KNOWN_BODY_CONTENT_TYPES.find((ct) => bodyContent[ct]) ??
        Object.keys(bodyContent)[0] ??
        null;
      const hasBody = bodyContentType !== null;
      // Binary: any content type not in the known set (e.g. octet-stream, pdf, image/*).
      const isBinaryBody =
        bodyContentType !== null && !KNOWN_BODY_CONTENT_TYPES.includes(bodyContentType);

      // Collect ALL 2xx response codes that carry application/json, in priority order.
      const allResponseCodes = Object.keys(operation.responses ?? {});
      const orderedCodes = [
        ...RESPONSE_PRIORITY_CODES.filter((c) => allResponseCodes.includes(c)),
        ...allResponseCodes.filter(
          (c) => !RESPONSE_PRIORITY_CODES.includes(c) && /^2/.test(c)
        ),
      ];
      const responseStatuses = orderedCodes.filter((code) => {
        const obj = operation.responses?.[code] as OpenAPIV3.ResponseObject | undefined;
        return obj?.content?.['application/json'] != null;
      });
      const hasResponse = responseStatuses.length > 0;

      const errorStatuses = Object.keys(operation.responses ?? {})
        .filter((code) => code === 'default' || /^[45]/.test(code))
        .filter((code) => {
          const obj = operation.responses?.[code] as OpenAPIV3.ResponseObject | undefined;
          return obj?.content?.['application/json'] != null;
        });

      const deprecated = operation.deprecated === true;

      // Detect discriminated union and collect date fields from the primary response schema.
      let discriminator: DiscriminatorModel | null = null;
      let dateFields: DateField[] = [];
      let responseIsArray = false;
      if (responseStatuses.length > 0) {
        const primaryResponseObj = operation.responses?.[responseStatuses[0]] as OpenAPIV3.ResponseObject | undefined;
        const primarySchema = primaryResponseObj?.content?.['application/json']?.schema as OpenAPIV3.SchemaObject | undefined;
        if (primarySchema) {
          discriminator =
            extractDiscriminatorFromSchema(primarySchema, false) ??
            (primarySchema.type === 'array'
              ? extractDiscriminatorFromSchema(primarySchema.items as OpenAPIV3.SchemaObject, true)
              : null);
          if (primarySchema.type === 'array' && primarySchema.items) {
            responseIsArray = true;
            dateFields = collectDateFields(primarySchema.items as OpenAPIV3.SchemaObject);
          } else {
            dateFields = collectDateFields(primarySchema);
          }
        }
      }

      endpoints.push({
        tag: toKebabCase(tag),
        operationId: rawId,
        method,
        apiPath,
        pathParams,
        headerParams,
        cookieParams,
        tokenName,
        fileName,
        hasQueryParams,
        specialQueryParams,
        hasBody,
        hasResponse,
        responseStatuses,
        bodyContentType,
        isBinaryBody,
        deprecated,
        securitySchemeNames,
        errorStatuses,
        discriminator,
        dateFields,
        responseIsArray,
      });
    }
  }

  return endpoints;
}

/** Extract WebhookModel entries from api.webhooks (OAS 3.1). */
export function parseWebhooks(
  api: OpenAPIV3.Document,
  namingConvention: 'camel' | 'kebab'
): WebhookModel[] {
  const webhooks = (api as unknown as { webhooks?: Record<string, OpenAPIV3.PathItemObject> })
    .webhooks;
  if (!webhooks) return [];

  const result: WebhookModel[] = [];
  for (const [name, pathItem] of Object.entries(webhooks)) {
    if (!pathItem) continue;
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method] as OpenAPIV3.OperationObject | undefined;
      if (!operation) continue;

      const fileName =
        (namingConvention === 'kebab' ? toKebabCase(name) : name) + '.webhook';
      const tokenName = toScreamingSnake(name) + '_WEBHOOK';

      const requestBody = operation.requestBody as OpenAPIV3.RequestBodyObject | undefined;
      const payloadContentType =
        requestBody?.content?.['application/json'] != null ? 'application/json' : null;

      const allResponseCodes = Object.keys(operation.responses ?? {});
      const orderedCodes = [
        ...RESPONSE_PRIORITY_CODES.filter((c) => allResponseCodes.includes(c)),
        ...allResponseCodes.filter((c) => !RESPONSE_PRIORITY_CODES.includes(c) && /^2/.test(c)),
      ];
      const responseStatuses = orderedCodes.filter((code) => {
        const obj = operation.responses?.[code] as OpenAPIV3.ResponseObject | undefined;
        return obj?.content?.['application/json'] != null;
      });

      result.push({
        name,
        method,
        tokenName,
        fileName,
        deprecated: operation.deprecated === true,
        payloadContentType,
        responseStatuses,
      });
    }
  }
  return result;
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
