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
}
