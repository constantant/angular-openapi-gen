import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GET_V1_FORECAST } from './get-v1-forecast.token';
import type { GetV1ForecastResponse } from './get-v1-forecast.token';

const _meta: MockResourceMeta = {
  specId: 'weather',
  operationId: 'get_v1_forecast',
  path: '/v1/forecast',
  method: 'get',
  tag: 'weather-forecast-apis',
};

export function provideGetV1ForecastMock(
  initialBehavior?: ProviderInitialBehavior<GetV1ForecastResponse>,
): FactoryProvider {
  return provideMockResource(
    GET_V1_FORECAST,
    'GET_V1_FORECAST',
    initialBehavior,
    _meta,
  );
}
