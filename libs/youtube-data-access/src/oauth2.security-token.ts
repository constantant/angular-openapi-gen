import { InjectionToken, Signal } from '@angular/core';

export const OAUTH2 = new InjectionToken<Signal<string | null>>('OAUTH2');
