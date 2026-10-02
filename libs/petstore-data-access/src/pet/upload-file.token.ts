import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  type HttpEvent,
} from '@angular/common/http';
import { map, type Observable } from 'rxjs';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { splitCallOptions, type CallOptions } from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type UploadFileParams =
  paths['/pet/{petId}/uploadImage']['post']['parameters']['query'];

export type UploadFileBody = Blob | ArrayBuffer;

export type UploadFileResponse =
  paths['/pet/{petId}/uploadImage']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    code: {
      type: 'integer',
      format: 'int32',
    },
    type: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
  xml: {
    name: '##default',
  },
};

function _validateResponse(value: unknown): UploadFileResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `UploadFile response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as UploadFileResponse;
}

export type UploadFileFn = (
  petId: string,
  body: UploadFileBody,
  params?: UploadFileParams,
  options?: CallOptions,
) => Observable<HttpEvent<UploadFileResponse>>;

export const UPLOAD_FILE = new InjectionToken<UploadFileFn>('UPLOAD_FILE');

export function provideUploadFile(): FactoryProvider {
  return {
    provide: UPLOAD_FILE,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (
        petId: string,
        body: UploadFileBody,
        params?: UploadFileParams,
        options?: CallOptions,
      ) => {
        const _opts = splitCallOptions(options);
        return http
          .request<UploadFileResponse>(
            'POST',
            `${base}/pet/${petId}/uploadImage`,
            {
              ..._opts.request,
              observe: 'events',
              reportProgress: true,
              params: params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
              body,
              headers: {
                ...(petstoreAuth?.() != null
                  ? { Authorization: `Bearer ${petstoreAuth()}` }
                  : {}),
                ..._opts.headers,
              },
            },
          )
          .pipe(
            map((e) =>
              e.type === HttpEventType.Response
                ? e.clone({ body: _validateResponse(e.body) })
                : e,
            ),
          );
      };
    },
  };
}
