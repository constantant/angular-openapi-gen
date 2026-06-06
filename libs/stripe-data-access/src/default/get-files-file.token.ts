import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetFilesFileParams =
  paths['/v1/files/{file}']['get']['parameters']['query'];

export type GetFilesFileResponse =
  paths['/v1/files/{file}']['get']['responses']['200']['content']['application/json'];

export const GET_FILES_FILE = new InjectionToken<
  (
    file: string,
    params?: GetFilesFileParams | (() => GetFilesFileParams | undefined),
  ) => ReturnType<typeof httpResource<GetFilesFileResponse>>
>('GET_FILES_FILE');

export function provideGetFilesFile(): FactoryProvider {
  return {
    provide: GET_FILES_FILE,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        file: string,
        params?: GetFilesFileParams | (() => GetFilesFileParams | undefined),
      ) =>
        httpResource<GetFilesFileResponse>(() => ({
          url: `${base}/v1/files/${file}`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
