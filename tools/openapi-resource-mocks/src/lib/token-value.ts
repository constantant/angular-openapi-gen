import { InjectionToken, ResourceRef } from '@angular/core';

/** Extracts the response type T from an InjectionToken<(...args) => ResourceRef<T>>. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TokenValue<Token extends InjectionToken<any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Token extends InjectionToken<(...args: any[]) => ResourceRef<infer V>> ? V : never;
