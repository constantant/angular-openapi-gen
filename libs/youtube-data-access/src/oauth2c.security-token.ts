import { InjectionToken, Signal } from '@angular/core';

export const OAUTH2C = new InjectionToken<Signal<string | null>>('OAUTH2C');
