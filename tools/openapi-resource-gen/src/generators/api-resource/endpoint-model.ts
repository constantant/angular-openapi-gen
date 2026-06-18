export interface DiscriminatorVariant {
  /** Discriminant literal value, e.g. 'cat'. */
  key: string;
  /** Component schema name extracted from discriminator.mapping, e.g. 'Cat'. Absent when only enum-based. */
  schemaName?: string;
}

export interface DiscriminatorModel {
  propertyName: string;
  variants: DiscriminatorVariant[];
  /** True when the response schema is an array whose items carry the discriminator. */
  isArrayResponse: boolean;
}

/** A response property with format:date-time or format:date. */
export interface DateField {
  name: string;
  format: 'date-time' | 'date';
}

export interface WebhookModel {
  /** The webhook name key as it appears in the spec, e.g. 'newPet'. */
  name: string;
  /** HTTP method of the webhook operation, e.g. 'post'. */
  method: string;
  /** SCREAMING_SNAKE token constant name, e.g. 'NEW_PET_WEBHOOK'. */
  tokenName: string;
  /** Kebab-case file name without extension, e.g. 'new-pet.webhook'. */
  fileName: string;
  deprecated: boolean;
  /** Content type of the request body, null if absent or non-JSON. */
  payloadContentType: string | null;
  /** 2xx response codes that carry application/json content. */
  responseStatuses: string[];
}

/** Non-default serialization style for a query parameter. */
export type QueryParamSerializer = 'deepObject' | 'csv' | 'pipes' | 'spaces';

export interface SpecialQueryParam {
  name: string;
  serializer: QueryParamSerializer;
}

export type SecurityKind =
  | 'bearer'
  | 'basic'
  | 'digest'
  | 'apiKey-header'
  | 'apiKey-query'
  | 'oauth2'
  | 'openIdConnect';

export interface SecuritySchemeModel {
  schemeName: string;
  kind: SecurityKind;
  /** Header name (apiKey-header) or query param name (apiKey-query). */
  apiKeyParamName?: string;
  /** SCREAMING_SNAKE constant exported from the security token file. */
  tokenName: string;
  /** Kebab file name without extension, e.g. `bearer-auth.security-token`. */
  fileName: string;
}

export interface EndpointModel {
  tag: string;
  operationId: string;
  method: string;
  apiPath: string;
  pathParams: string[];
  headerParams: Array<{ name: string; required: boolean }>;
  cookieParams: Array<{ name: string; required: boolean }>;
  tokenName: string;
  fileName: string;
  hasQueryParams: boolean;
  /** Query params that need non-default serialization (deepObject, pipeDelimited, spaceDelimited, form+explode:false). */
  specialQueryParams: SpecialQueryParam[];
  hasBody: boolean;
  hasResponse: boolean;
  /** All 2xx response codes that carry application/json content, in priority order. */
  responseStatuses: string[];
  /** 4xx/5xx/default response codes that carry application/json content. */
  errorStatuses: string[];
  bodyContentType: string | null;
  /** True when bodyContentType is not json / form-urlencoded / multipart (e.g. octet-stream, pdf, image). */
  isBinaryBody: boolean;
  /** True when the operation is marked deprecated in the spec. */
  deprecated: boolean;
  /** Names of security schemes that apply to this endpoint (resolved from global + operation level). */
  securitySchemeNames: string[];
  /** Present when the primary response schema carries a discriminator. */
  discriminator: DiscriminatorModel | null;
  /** Date/datetime fields on the primary response object, for optional reviver generation. */
  dateFields: DateField[];
  /** True when the primary JSON response type is an array. */
  responseIsArray: boolean;
}
