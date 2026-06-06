export interface EndpointModel {
  tag: string;
  operationId: string;
  method: string;
  apiPath: string;
  pathParams: string[];
  tokenName: string;
  fileName: string;
  hasQueryParams: boolean;
  hasBody: boolean;
  hasResponse: boolean;
  responseStatus: string | null;
  bodyContentType: string | null;
}
