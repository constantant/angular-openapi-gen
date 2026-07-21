import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

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

export const UPLOAD_FILE = new InjectionToken<
  (
    petId: string,
    body: UploadFileBody | Signal<UploadFileBody>,
  ) => ReturnType<typeof httpResource<UploadFileResponse>>
>('UPLOAD_FILE');

export function provideUploadFile(): FactoryProvider {
  return {
    provide: UPLOAD_FILE,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      const petstoreAuth = inject(PETSTORE_AUTH, { optional: true });
      return (petId: string, body: UploadFileBody | Signal<UploadFileBody>) =>
        httpResource<UploadFileResponse>(
          () => ({
            url: `${base}/pet/${petId}/uploadImage`,
            method: 'POST',
            body,
            headers: {
              ...(petstoreAuth?.() != null
                ? { Authorization: `Bearer ${petstoreAuth()}` }
                : {}),
            },
          }),
          { parse: _validateResponse },
        );
    },
  };
}
