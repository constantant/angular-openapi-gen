import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type UploadFileBody = NonNullable<
  paths['/pet/{petId}/uploadImage']['post']['requestBody']
>['content']['application/octet-stream'];

type UploadFileResponse =
  paths['/pet/{petId}/uploadImage']['post']['responses']['200']['content']['application/json'];

export const UPLOAD_FILE = new InjectionToken<
  (
    petId: string,
    body: UploadFileBody | Signal<UploadFileBody>,
  ) => ReturnType<typeof httpResource<UploadFileResponse>>
>('UPLOAD_FILE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (petId: string, body: UploadFileBody | Signal<UploadFileBody>) =>
      httpResource<UploadFileResponse>(() => ({
        url: `${base}/pet/${petId}/uploadImage`,
        method: 'POST',
        body,
      }));
  },
});
