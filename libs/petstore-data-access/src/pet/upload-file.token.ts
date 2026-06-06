import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';
import { PETSTORE_AUTH } from '../petstore-auth.security-token';

export type UploadFileBody = NonNullable<
  paths['/pet/{petId}/uploadImage']['post']['requestBody']
>['content']['application/octet-stream'];

export type UploadFileResponse =
  paths['/pet/{petId}/uploadImage']['post']['responses']['200']['content']['application/json'];

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
        httpResource<UploadFileResponse>(() => ({
          url: `${base}/pet/${petId}/uploadImage`,
          method: 'POST',
          body,
          headers: {
            ...(petstoreAuth?.() != null
              ? { Authorization: `Bearer ${petstoreAuth!()}` }
              : {}),
          },
        }));
    },
  };
}
