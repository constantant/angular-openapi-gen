import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostFilesBody = NonNullable<
  paths['/v1/files']['post']['requestBody']
>['content']['multipart/form-data'];

export type PostFilesResponse =
  paths['/v1/files']['post']['responses']['200']['content']['application/json'];

export const POST_FILES = new InjectionToken<
  (
    body: PostFilesBody | Signal<PostFilesBody>,
  ) => ReturnType<typeof httpResource<PostFilesResponse>>
>('POST_FILES');

export function providePostFiles(): FactoryProvider {
  return {
    provide: POST_FILES,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (body: PostFilesBody | Signal<PostFilesBody>) =>
        httpResource<PostFilesResponse>(() => ({
          url: `${base}/v1/files`,
          method: 'POST',
          body,
        }));
    },
  };
}
