import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { WEATHER_BASE_URL } from '../api-base-url.token';

export type GetV1ForecastParams =
  paths['/v1/forecast']['get']['parameters']['query'];

export type GetV1ForecastResponse =
  paths['/v1/forecast']['get']['responses']['200']['content']['application/json'];

export type GetV1ForecastError =
  paths['/v1/forecast']['get']['responses']['400']['content']['application/json'];

function _serializeParams(
  p: GetV1ForecastParams | undefined,
): Record<string, string | readonly string[]> | undefined {
  if (p == null) return undefined;
  const _out: Record<string, string | readonly string[]> = {};
  for (const [_k, _v] of Object.entries(p as Record<string, unknown>)) {
    if (_v == null) continue;
    switch (_k) {
      case 'hourly':
        _out['hourly'] = Array.isArray(_v)
          ? (_v as unknown[]).join(',')
          : String(_v);
        break;
      case 'daily':
        _out['daily'] = Array.isArray(_v)
          ? (_v as unknown[]).join(',')
          : String(_v);
        break;
      case 'current':
        _out['current'] = Array.isArray(_v)
          ? (_v as unknown[]).join(',')
          : String(_v);
        break;
      case 'minutely_15':
        _out['minutely_15'] = Array.isArray(_v)
          ? (_v as unknown[]).join(',')
          : String(_v);
        break;
      case 'models':
        _out['models'] = Array.isArray(_v)
          ? (_v as unknown[]).join(',')
          : String(_v);
        break;
      default:
        _out[_k] = Array.isArray(_v)
          ? (_v as unknown[]).map(String)
          : String(_v as string | number | boolean);
    }
  }
  return _out;
}

export const GET_V1_FORECAST = new InjectionToken<
  (
    params?: GetV1ForecastParams | (() => GetV1ForecastParams | undefined),
  ) => ReturnType<typeof httpResource<GetV1ForecastResponse>>
>('GET_V1_FORECAST');

export function provideGetV1Forecast(): FactoryProvider {
  return {
    provide: GET_V1_FORECAST,
    useFactory: () => {
      const base = inject(WEATHER_BASE_URL);
      return (
        params?: GetV1ForecastParams | (() => GetV1ForecastParams | undefined),
      ) =>
        httpResource<GetV1ForecastResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/v1/forecast`,
            params: _serializeParams(_params) as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
