import { InjectionToken, Signal } from '@angular/core';

export const API_KEY = new InjectionToken<Signal<string | null>>('API_KEY');
