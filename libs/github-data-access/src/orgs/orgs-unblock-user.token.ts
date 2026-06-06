import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_UNBLOCK_USER = new InjectionToken<
  (org: string, username: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_UNBLOCK_USER');

export function provideOrgsUnblockUser(): FactoryProvider {
  return {
    provide: ORGS_UNBLOCK_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/blocks/${username}`,
          method: 'DELETE',
        }));
    },
  };
}
