import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { WEATHER_BASE_URL } from '../api-base-url.token';

export type GetV1ForecastParams =
  paths['/v1/forecast']['get']['parameters']['query'];

export type GetV1ForecastResponse =
  paths['/v1/forecast']['get']['responses']['200']['content']['application/json'];

export type GetV1ForecastError =
  paths['/v1/forecast']['get']['responses']['400']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'object',
  properties: {
    latitude: {
      type: 'number',
      format: 'float',
    },
    longitude: {
      type: 'number',
      format: 'float',
    },
    elevation: {
      type: 'number',
      format: 'float',
    },
    generationtime_ms: {
      type: 'number',
      format: 'float',
    },
    utc_offset_seconds: {
      type: 'integer',
    },
    timezone: {
      type: 'string',
    },
    timezone_abbreviation: {
      type: 'string',
    },
    hourly: {
      type: 'object',
      properties: {
        time: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        temperature_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_2m_min: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_2m_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        apparent_temperature: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        rain: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        showers: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snow_depth: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall_water_equivalent: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snow_depth_water_equivalent: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        weather_code: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        pressure_msl: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        surface_pressure: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_low: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_mid: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_high: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        visibility: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        evapotranspiration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        et0_fao_evapotranspiration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vapour_pressure_deficit: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        runoff: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation_type: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        rain_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        freezing_rain_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        ice_pellets_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        thunderstorm_probability: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_20m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_30m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_40m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_50m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_70m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_80m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_100m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_120m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_140m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_150m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_160m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_180m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_200m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_20m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_30m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_40m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_50m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_70m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_80m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_100m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_120m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_140m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_150m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_160m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_180m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_200m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_gusts_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_20m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_40m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_50m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_80m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_100m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_120m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_150m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_180m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_200m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_0cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_6cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_18cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_54cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_162cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_486cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_1458cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_0_to_7cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_7_to_28cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_28_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_100_to_255cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_0_to_10cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_10_to_40cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_40_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_100_to_200cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_10_to_35cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_35_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_temperature_100_to_300cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_0_to_1cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_1_to_3cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_3_to_9cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_9_to_27cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_27_to_81cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_81_to_243cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_243_to_729cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_729_to_2187cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_0_to_7cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_7_to_28cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_28_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_100_to_255cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_0_to_10cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_10_to_40cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_40_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_100_to_200cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_10_to_35cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_35_to_100cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        soil_moisture_100_to_300cm: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        uv_index: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        uv_index_clear_sky: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        is_day: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        sunshine_duration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wet_bulb_temperature_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        total_column_integrated_water_vapour: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cape: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        lifted_index: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        convective_inhibition: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        freezing_level_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        boundary_layer_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        surface_temperature: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        mass_density_8m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        convective_cloud_base: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        convective_cloud_top: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        updraft: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        lightning_potential: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        lightning_density: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snow_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        roughness_length: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        albedo: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        k_index: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sea_level_height_msl: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sea_ice_thickness: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sea_surface_temperature: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        ocean_current_velocity: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        ocean_current_direction: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        shortwave_radiation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        direct_radiation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        diffuse_radiation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        direct_normal_irradiance: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        global_tilted_irradiance: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        terrestrial_radiation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        shortwave_radiation_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        direct_radiation_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        diffuse_radiation_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        direct_normal_irradiance_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        global_tilted_irradiance_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        terrestrial_radiation_instant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cloud_cover_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        vertical_velocity_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_1000hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_950hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_925hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_900hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_850hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_800hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_750hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_700hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_650hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_600hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_550hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_500hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_450hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_400hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_350hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_300hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_275hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_250hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_225hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_200hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_175hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_150hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_125hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_100hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_50hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        geopotential_height_10hPa: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
      },
    },
    hourly_units: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
        },
        temperature_2m: {
          type: 'string',
        },
        temperature_2m_min: {
          type: 'string',
        },
        temperature_2m_max: {
          type: 'string',
        },
        relative_humidity_2m: {
          type: 'string',
        },
        dew_point_2m: {
          type: 'string',
        },
        apparent_temperature: {
          type: 'string',
        },
        precipitation_probability: {
          type: 'string',
        },
        precipitation: {
          type: 'string',
        },
        rain: {
          type: 'string',
        },
        showers: {
          type: 'string',
        },
        snowfall: {
          type: 'string',
        },
        snow_depth: {
          type: 'string',
        },
        snowfall_water_equivalent: {
          type: 'string',
        },
        snow_depth_water_equivalent: {
          type: 'string',
        },
        weather_code: {
          type: 'string',
        },
        pressure_msl: {
          type: 'string',
        },
        surface_pressure: {
          type: 'string',
        },
        cloud_cover: {
          type: 'string',
        },
        cloud_cover_low: {
          type: 'string',
        },
        cloud_cover_mid: {
          type: 'string',
        },
        cloud_cover_high: {
          type: 'string',
        },
        visibility: {
          type: 'string',
        },
        evapotranspiration: {
          type: 'string',
        },
        et0_fao_evapotranspiration: {
          type: 'string',
        },
        vapour_pressure_deficit: {
          type: 'string',
        },
        runoff: {
          type: 'string',
        },
        precipitation_type: {
          type: 'string',
        },
        rain_probability: {
          type: 'string',
        },
        snowfall_probability: {
          type: 'string',
        },
        freezing_rain_probability: {
          type: 'string',
        },
        ice_pellets_probability: {
          type: 'string',
        },
        thunderstorm_probability: {
          type: 'string',
        },
        wind_speed_10m: {
          type: 'string',
        },
        wind_speed_20m: {
          type: 'string',
        },
        wind_speed_30m: {
          type: 'string',
        },
        wind_speed_40m: {
          type: 'string',
        },
        wind_speed_50m: {
          type: 'string',
        },
        wind_speed_70m: {
          type: 'string',
        },
        wind_speed_80m: {
          type: 'string',
        },
        wind_speed_100m: {
          type: 'string',
        },
        wind_speed_120m: {
          type: 'string',
        },
        wind_speed_140m: {
          type: 'string',
        },
        wind_speed_150m: {
          type: 'string',
        },
        wind_speed_160m: {
          type: 'string',
        },
        wind_speed_180m: {
          type: 'string',
        },
        wind_speed_200m: {
          type: 'string',
        },
        wind_direction_10m: {
          type: 'string',
        },
        wind_direction_20m: {
          type: 'string',
        },
        wind_direction_30m: {
          type: 'string',
        },
        wind_direction_40m: {
          type: 'string',
        },
        wind_direction_50m: {
          type: 'string',
        },
        wind_direction_70m: {
          type: 'string',
        },
        wind_direction_80m: {
          type: 'string',
        },
        wind_direction_100m: {
          type: 'string',
        },
        wind_direction_120m: {
          type: 'string',
        },
        wind_direction_140m: {
          type: 'string',
        },
        wind_direction_150m: {
          type: 'string',
        },
        wind_direction_160m: {
          type: 'string',
        },
        wind_direction_180m: {
          type: 'string',
        },
        wind_direction_200m: {
          type: 'string',
        },
        wind_gusts_10m: {
          type: 'string',
        },
        temperature_20m: {
          type: 'string',
        },
        temperature_40m: {
          type: 'string',
        },
        temperature_50m: {
          type: 'string',
        },
        temperature_80m: {
          type: 'string',
        },
        temperature_100m: {
          type: 'string',
        },
        temperature_120m: {
          type: 'string',
        },
        temperature_150m: {
          type: 'string',
        },
        temperature_180m: {
          type: 'string',
        },
        temperature_200m: {
          type: 'string',
        },
        soil_temperature_0cm: {
          type: 'string',
        },
        soil_temperature_6cm: {
          type: 'string',
        },
        soil_temperature_18cm: {
          type: 'string',
        },
        soil_temperature_54cm: {
          type: 'string',
        },
        soil_temperature_162cm: {
          type: 'string',
        },
        soil_temperature_486cm: {
          type: 'string',
        },
        soil_temperature_1458cm: {
          type: 'string',
        },
        soil_temperature_0_to_7cm: {
          type: 'string',
        },
        soil_temperature_7_to_28cm: {
          type: 'string',
        },
        soil_temperature_28_to_100cm: {
          type: 'string',
        },
        soil_temperature_100_to_255cm: {
          type: 'string',
        },
        soil_temperature_0_to_10cm: {
          type: 'string',
        },
        soil_temperature_10_to_40cm: {
          type: 'string',
        },
        soil_temperature_40_to_100cm: {
          type: 'string',
        },
        soil_temperature_100_to_200cm: {
          type: 'string',
        },
        soil_temperature_10_to_35cm: {
          type: 'string',
        },
        soil_temperature_35_to_100cm: {
          type: 'string',
        },
        soil_temperature_100_to_300cm: {
          type: 'string',
        },
        soil_moisture_0_to_1cm: {
          type: 'string',
        },
        soil_moisture_1_to_3cm: {
          type: 'string',
        },
        soil_moisture_3_to_9cm: {
          type: 'string',
        },
        soil_moisture_9_to_27cm: {
          type: 'string',
        },
        soil_moisture_27_to_81cm: {
          type: 'string',
        },
        soil_moisture_81_to_243cm: {
          type: 'string',
        },
        soil_moisture_243_to_729cm: {
          type: 'string',
        },
        soil_moisture_729_to_2187cm: {
          type: 'string',
        },
        soil_moisture_0_to_7cm: {
          type: 'string',
        },
        soil_moisture_7_to_28cm: {
          type: 'string',
        },
        soil_moisture_28_to_100cm: {
          type: 'string',
        },
        soil_moisture_100_to_255cm: {
          type: 'string',
        },
        soil_moisture_0_to_10cm: {
          type: 'string',
        },
        soil_moisture_10_to_40cm: {
          type: 'string',
        },
        soil_moisture_40_to_100cm: {
          type: 'string',
        },
        soil_moisture_100_to_200cm: {
          type: 'string',
        },
        soil_moisture_10_to_35cm: {
          type: 'string',
        },
        soil_moisture_35_to_100cm: {
          type: 'string',
        },
        soil_moisture_100_to_300cm: {
          type: 'string',
        },
        uv_index: {
          type: 'string',
        },
        uv_index_clear_sky: {
          type: 'string',
        },
        is_day: {
          type: 'string',
        },
        sunshine_duration: {
          type: 'string',
        },
        wet_bulb_temperature_2m: {
          type: 'string',
        },
        total_column_integrated_water_vapour: {
          type: 'string',
        },
        cape: {
          type: 'string',
        },
        lifted_index: {
          type: 'string',
        },
        convective_inhibition: {
          type: 'string',
        },
        freezing_level_height: {
          type: 'string',
        },
        boundary_layer_height: {
          type: 'string',
        },
        surface_temperature: {
          type: 'string',
        },
        mass_density_8m: {
          type: 'string',
        },
        snowfall_height: {
          type: 'string',
        },
        convective_cloud_base: {
          type: 'string',
        },
        convective_cloud_top: {
          type: 'string',
        },
        updraft: {
          type: 'string',
        },
        lightning_potential: {
          type: 'string',
        },
        lightning_density: {
          type: 'string',
        },
        snow_height: {
          type: 'string',
        },
        roughness_length: {
          type: 'string',
        },
        albedo: {
          type: 'string',
        },
        k_index: {
          type: 'string',
        },
        sea_level_height_msl: {
          type: 'string',
        },
        sea_ice_thickness: {
          type: 'string',
        },
        sea_surface_temperature: {
          type: 'string',
        },
        ocean_current_velocity: {
          type: 'string',
        },
        ocean_current_direction: {
          type: 'string',
        },
        shortwave_radiation: {
          type: 'string',
        },
        direct_radiation: {
          type: 'string',
        },
        diffuse_radiation: {
          type: 'string',
        },
        direct_normal_irradiance: {
          type: 'string',
        },
        global_tilted_irradiance: {
          type: 'string',
        },
        terrestrial_radiation: {
          type: 'string',
        },
        shortwave_radiation_instant: {
          type: 'string',
        },
        direct_radiation_instant: {
          type: 'string',
        },
        diffuse_radiation_instant: {
          type: 'string',
        },
        direct_normal_irradiance_instant: {
          type: 'string',
        },
        global_tilted_irradiance_instant: {
          type: 'string',
        },
        terrestrial_radiation_instant: {
          type: 'string',
        },
        temperature_1000hPa: {
          type: 'string',
        },
        temperature_950hPa: {
          type: 'string',
        },
        temperature_925hPa: {
          type: 'string',
        },
        temperature_900hPa: {
          type: 'string',
        },
        temperature_850hPa: {
          type: 'string',
        },
        temperature_800hPa: {
          type: 'string',
        },
        temperature_750hPa: {
          type: 'string',
        },
        temperature_700hPa: {
          type: 'string',
        },
        temperature_650hPa: {
          type: 'string',
        },
        temperature_600hPa: {
          type: 'string',
        },
        temperature_550hPa: {
          type: 'string',
        },
        temperature_500hPa: {
          type: 'string',
        },
        temperature_450hPa: {
          type: 'string',
        },
        temperature_400hPa: {
          type: 'string',
        },
        temperature_350hPa: {
          type: 'string',
        },
        temperature_300hPa: {
          type: 'string',
        },
        temperature_275hPa: {
          type: 'string',
        },
        temperature_250hPa: {
          type: 'string',
        },
        temperature_225hPa: {
          type: 'string',
        },
        temperature_200hPa: {
          type: 'string',
        },
        temperature_175hPa: {
          type: 'string',
        },
        temperature_150hPa: {
          type: 'string',
        },
        temperature_125hPa: {
          type: 'string',
        },
        temperature_100hPa: {
          type: 'string',
        },
        temperature_50hPa: {
          type: 'string',
        },
        temperature_10hPa: {
          type: 'string',
        },
        dew_point_1000hPa: {
          type: 'string',
        },
        dew_point_950hPa: {
          type: 'string',
        },
        dew_point_925hPa: {
          type: 'string',
        },
        dew_point_900hPa: {
          type: 'string',
        },
        dew_point_850hPa: {
          type: 'string',
        },
        dew_point_800hPa: {
          type: 'string',
        },
        dew_point_750hPa: {
          type: 'string',
        },
        dew_point_700hPa: {
          type: 'string',
        },
        dew_point_650hPa: {
          type: 'string',
        },
        dew_point_600hPa: {
          type: 'string',
        },
        dew_point_550hPa: {
          type: 'string',
        },
        dew_point_500hPa: {
          type: 'string',
        },
        dew_point_450hPa: {
          type: 'string',
        },
        dew_point_400hPa: {
          type: 'string',
        },
        dew_point_350hPa: {
          type: 'string',
        },
        dew_point_300hPa: {
          type: 'string',
        },
        dew_point_275hPa: {
          type: 'string',
        },
        dew_point_250hPa: {
          type: 'string',
        },
        dew_point_225hPa: {
          type: 'string',
        },
        dew_point_200hPa: {
          type: 'string',
        },
        dew_point_175hPa: {
          type: 'string',
        },
        dew_point_150hPa: {
          type: 'string',
        },
        dew_point_125hPa: {
          type: 'string',
        },
        dew_point_100hPa: {
          type: 'string',
        },
        dew_point_50hPa: {
          type: 'string',
        },
        dew_point_10hPa: {
          type: 'string',
        },
        relative_humidity_1000hPa: {
          type: 'string',
        },
        relative_humidity_950hPa: {
          type: 'string',
        },
        relative_humidity_925hPa: {
          type: 'string',
        },
        relative_humidity_900hPa: {
          type: 'string',
        },
        relative_humidity_850hPa: {
          type: 'string',
        },
        relative_humidity_800hPa: {
          type: 'string',
        },
        relative_humidity_750hPa: {
          type: 'string',
        },
        relative_humidity_700hPa: {
          type: 'string',
        },
        relative_humidity_650hPa: {
          type: 'string',
        },
        relative_humidity_600hPa: {
          type: 'string',
        },
        relative_humidity_550hPa: {
          type: 'string',
        },
        relative_humidity_500hPa: {
          type: 'string',
        },
        relative_humidity_450hPa: {
          type: 'string',
        },
        relative_humidity_400hPa: {
          type: 'string',
        },
        relative_humidity_350hPa: {
          type: 'string',
        },
        relative_humidity_300hPa: {
          type: 'string',
        },
        relative_humidity_275hPa: {
          type: 'string',
        },
        relative_humidity_250hPa: {
          type: 'string',
        },
        relative_humidity_225hPa: {
          type: 'string',
        },
        relative_humidity_200hPa: {
          type: 'string',
        },
        relative_humidity_175hPa: {
          type: 'string',
        },
        relative_humidity_150hPa: {
          type: 'string',
        },
        relative_humidity_125hPa: {
          type: 'string',
        },
        relative_humidity_100hPa: {
          type: 'string',
        },
        relative_humidity_50hPa: {
          type: 'string',
        },
        relative_humidity_10hPa: {
          type: 'string',
        },
        cloud_cover_1000hPa: {
          type: 'string',
        },
        cloud_cover_950hPa: {
          type: 'string',
        },
        cloud_cover_925hPa: {
          type: 'string',
        },
        cloud_cover_900hPa: {
          type: 'string',
        },
        cloud_cover_850hPa: {
          type: 'string',
        },
        cloud_cover_800hPa: {
          type: 'string',
        },
        cloud_cover_750hPa: {
          type: 'string',
        },
        cloud_cover_700hPa: {
          type: 'string',
        },
        cloud_cover_650hPa: {
          type: 'string',
        },
        cloud_cover_600hPa: {
          type: 'string',
        },
        cloud_cover_550hPa: {
          type: 'string',
        },
        cloud_cover_500hPa: {
          type: 'string',
        },
        cloud_cover_450hPa: {
          type: 'string',
        },
        cloud_cover_400hPa: {
          type: 'string',
        },
        cloud_cover_350hPa: {
          type: 'string',
        },
        cloud_cover_300hPa: {
          type: 'string',
        },
        cloud_cover_275hPa: {
          type: 'string',
        },
        cloud_cover_250hPa: {
          type: 'string',
        },
        cloud_cover_225hPa: {
          type: 'string',
        },
        cloud_cover_200hPa: {
          type: 'string',
        },
        cloud_cover_175hPa: {
          type: 'string',
        },
        cloud_cover_150hPa: {
          type: 'string',
        },
        cloud_cover_125hPa: {
          type: 'string',
        },
        cloud_cover_100hPa: {
          type: 'string',
        },
        cloud_cover_50hPa: {
          type: 'string',
        },
        cloud_cover_10hPa: {
          type: 'string',
        },
        wind_speed_1000hPa: {
          type: 'string',
        },
        wind_speed_950hPa: {
          type: 'string',
        },
        wind_speed_925hPa: {
          type: 'string',
        },
        wind_speed_900hPa: {
          type: 'string',
        },
        wind_speed_850hPa: {
          type: 'string',
        },
        wind_speed_800hPa: {
          type: 'string',
        },
        wind_speed_750hPa: {
          type: 'string',
        },
        wind_speed_700hPa: {
          type: 'string',
        },
        wind_speed_650hPa: {
          type: 'string',
        },
        wind_speed_600hPa: {
          type: 'string',
        },
        wind_speed_550hPa: {
          type: 'string',
        },
        wind_speed_500hPa: {
          type: 'string',
        },
        wind_speed_450hPa: {
          type: 'string',
        },
        wind_speed_400hPa: {
          type: 'string',
        },
        wind_speed_350hPa: {
          type: 'string',
        },
        wind_speed_300hPa: {
          type: 'string',
        },
        wind_speed_275hPa: {
          type: 'string',
        },
        wind_speed_250hPa: {
          type: 'string',
        },
        wind_speed_225hPa: {
          type: 'string',
        },
        wind_speed_200hPa: {
          type: 'string',
        },
        wind_speed_175hPa: {
          type: 'string',
        },
        wind_speed_150hPa: {
          type: 'string',
        },
        wind_speed_125hPa: {
          type: 'string',
        },
        wind_speed_100hPa: {
          type: 'string',
        },
        wind_speed_50hPa: {
          type: 'string',
        },
        wind_speed_10hPa: {
          type: 'string',
        },
        wind_direction_1000hPa: {
          type: 'string',
        },
        wind_direction_950hPa: {
          type: 'string',
        },
        wind_direction_925hPa: {
          type: 'string',
        },
        wind_direction_900hPa: {
          type: 'string',
        },
        wind_direction_850hPa: {
          type: 'string',
        },
        wind_direction_800hPa: {
          type: 'string',
        },
        wind_direction_750hPa: {
          type: 'string',
        },
        wind_direction_700hPa: {
          type: 'string',
        },
        wind_direction_650hPa: {
          type: 'string',
        },
        wind_direction_600hPa: {
          type: 'string',
        },
        wind_direction_550hPa: {
          type: 'string',
        },
        wind_direction_500hPa: {
          type: 'string',
        },
        wind_direction_450hPa: {
          type: 'string',
        },
        wind_direction_400hPa: {
          type: 'string',
        },
        wind_direction_350hPa: {
          type: 'string',
        },
        wind_direction_300hPa: {
          type: 'string',
        },
        wind_direction_275hPa: {
          type: 'string',
        },
        wind_direction_250hPa: {
          type: 'string',
        },
        wind_direction_225hPa: {
          type: 'string',
        },
        wind_direction_200hPa: {
          type: 'string',
        },
        wind_direction_175hPa: {
          type: 'string',
        },
        wind_direction_150hPa: {
          type: 'string',
        },
        wind_direction_125hPa: {
          type: 'string',
        },
        wind_direction_100hPa: {
          type: 'string',
        },
        wind_direction_50hPa: {
          type: 'string',
        },
        wind_direction_10hPa: {
          type: 'string',
        },
        vertical_velocity_1000hPa: {
          type: 'string',
        },
        vertical_velocity_950hPa: {
          type: 'string',
        },
        vertical_velocity_925hPa: {
          type: 'string',
        },
        vertical_velocity_900hPa: {
          type: 'string',
        },
        vertical_velocity_850hPa: {
          type: 'string',
        },
        vertical_velocity_800hPa: {
          type: 'string',
        },
        vertical_velocity_750hPa: {
          type: 'string',
        },
        vertical_velocity_700hPa: {
          type: 'string',
        },
        vertical_velocity_650hPa: {
          type: 'string',
        },
        vertical_velocity_600hPa: {
          type: 'string',
        },
        vertical_velocity_550hPa: {
          type: 'string',
        },
        vertical_velocity_500hPa: {
          type: 'string',
        },
        vertical_velocity_450hPa: {
          type: 'string',
        },
        vertical_velocity_400hPa: {
          type: 'string',
        },
        vertical_velocity_350hPa: {
          type: 'string',
        },
        vertical_velocity_300hPa: {
          type: 'string',
        },
        vertical_velocity_275hPa: {
          type: 'string',
        },
        vertical_velocity_250hPa: {
          type: 'string',
        },
        vertical_velocity_225hPa: {
          type: 'string',
        },
        vertical_velocity_200hPa: {
          type: 'string',
        },
        vertical_velocity_175hPa: {
          type: 'string',
        },
        vertical_velocity_150hPa: {
          type: 'string',
        },
        vertical_velocity_125hPa: {
          type: 'string',
        },
        vertical_velocity_100hPa: {
          type: 'string',
        },
        vertical_velocity_50hPa: {
          type: 'string',
        },
        vertical_velocity_10hPa: {
          type: 'string',
        },
        geopotential_height_1000hPa: {
          type: 'string',
        },
        geopotential_height_950hPa: {
          type: 'string',
        },
        geopotential_height_925hPa: {
          type: 'string',
        },
        geopotential_height_900hPa: {
          type: 'string',
        },
        geopotential_height_850hPa: {
          type: 'string',
        },
        geopotential_height_800hPa: {
          type: 'string',
        },
        geopotential_height_750hPa: {
          type: 'string',
        },
        geopotential_height_700hPa: {
          type: 'string',
        },
        geopotential_height_650hPa: {
          type: 'string',
        },
        geopotential_height_600hPa: {
          type: 'string',
        },
        geopotential_height_550hPa: {
          type: 'string',
        },
        geopotential_height_500hPa: {
          type: 'string',
        },
        geopotential_height_450hPa: {
          type: 'string',
        },
        geopotential_height_400hPa: {
          type: 'string',
        },
        geopotential_height_350hPa: {
          type: 'string',
        },
        geopotential_height_300hPa: {
          type: 'string',
        },
        geopotential_height_275hPa: {
          type: 'string',
        },
        geopotential_height_250hPa: {
          type: 'string',
        },
        geopotential_height_225hPa: {
          type: 'string',
        },
        geopotential_height_200hPa: {
          type: 'string',
        },
        geopotential_height_175hPa: {
          type: 'string',
        },
        geopotential_height_150hPa: {
          type: 'string',
        },
        geopotential_height_125hPa: {
          type: 'string',
        },
        geopotential_height_100hPa: {
          type: 'string',
        },
        geopotential_height_50hPa: {
          type: 'string',
        },
        geopotential_height_10hPa: {
          type: 'string',
        },
      },
    },
    daily: {
      type: 'object',
      properties: {
        time: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        weather_code: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        temperature_2m_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        temperature_2m_min: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        apparent_temperature_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        apparent_temperature_min: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sunrise: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        sunset: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        daylight_duration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sunshine_duration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        uv_index_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        uv_index_clear_sky_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        rain_sum: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        showers_sum: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall_sum: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation_sum: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation_hours: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation_probability_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_10m_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_gusts_10m_max: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_10m_dominant: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        shortwave_radiation_sum: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        et0_fao_evapotranspiration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
      },
    },
    daily_units: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
        },
        weather_code: {
          type: 'string',
        },
        temperature_2m_max: {
          type: 'string',
        },
        temperature_2m_min: {
          type: 'string',
        },
        apparent_temperature_max: {
          type: 'string',
        },
        apparent_temperature_min: {
          type: 'string',
        },
        sunrise: {
          type: 'string',
        },
        sunset: {
          type: 'string',
        },
        daylight_duration: {
          type: 'string',
        },
        sunshine_duration: {
          type: 'string',
        },
        uv_index_max: {
          type: 'string',
        },
        uv_index_clear_sky_max: {
          type: 'string',
        },
        rain_sum: {
          type: 'string',
        },
        showers_sum: {
          type: 'string',
        },
        snowfall_sum: {
          type: 'string',
        },
        precipitation_sum: {
          type: 'string',
        },
        precipitation_hours: {
          type: 'string',
        },
        precipitation_probability_max: {
          type: 'string',
        },
        wind_speed_10m_max: {
          type: 'string',
        },
        wind_gusts_10m_max: {
          type: 'string',
        },
        wind_direction_10m_dominant: {
          type: 'string',
        },
        shortwave_radiation_sum: {
          type: 'string',
        },
        et0_fao_evapotranspiration: {
          type: 'string',
        },
      },
    },
    current: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
        },
        interval: {
          type: 'integer',
        },
        temperature_2m: {
          type: 'number',
          format: 'float',
        },
        relative_humidity_2m: {
          type: 'number',
          format: 'float',
        },
        apparent_temperature: {
          type: 'number',
          format: 'float',
        },
        is_day: {
          type: 'integer',
        },
        precipitation: {
          type: 'number',
          format: 'float',
        },
        rain: {
          type: 'number',
          format: 'float',
        },
        showers: {
          type: 'number',
          format: 'float',
        },
        snowfall: {
          type: 'number',
          format: 'float',
        },
        weather_code: {
          type: 'integer',
        },
        cloud_cover: {
          type: 'number',
          format: 'float',
        },
        pressure_msl: {
          type: 'number',
          format: 'float',
        },
        surface_pressure: {
          type: 'number',
          format: 'float',
        },
        wind_speed_10m: {
          type: 'number',
          format: 'float',
        },
        wind_direction_10m: {
          type: 'number',
          format: 'float',
        },
        wind_gusts_10m: {
          type: 'number',
          format: 'float',
        },
      },
    },
    current_units: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
        },
        temperature_2m: {
          type: 'string',
        },
        relative_humidity_2m: {
          type: 'string',
        },
        apparent_temperature: {
          type: 'string',
        },
        is_day: {
          type: 'string',
        },
        precipitation: {
          type: 'string',
        },
        rain: {
          type: 'string',
        },
        showers: {
          type: 'string',
        },
        snowfall: {
          type: 'string',
        },
        weather_code: {
          type: 'string',
        },
        cloud_cover: {
          type: 'string',
        },
        pressure_msl: {
          type: 'string',
        },
        surface_pressure: {
          type: 'string',
        },
        wind_speed_10m: {
          type: 'string',
        },
        wind_direction_10m: {
          type: 'string',
        },
        wind_gusts_10m: {
          type: 'string',
        },
      },
    },
    minutely_15: {
      type: 'object',
      properties: {
        time: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        temperature_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        relative_humidity_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        dew_point_2m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        apparent_temperature: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        precipitation: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        rain: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        snowfall_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        freezing_level_height: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        sunshine_duration: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        weather_code: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
        wind_speed_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_20m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_50m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_80m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_speed_100m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_20m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_50m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_80m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_direction_100m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        wind_gusts_10m: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        visibility: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        cape: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        lightning_potential: {
          type: 'array',
          items: {
            type: 'number',
            format: 'float',
          },
        },
        is_day: {
          type: 'array',
          items: {
            type: 'integer',
          },
        },
      },
    },
    minutely_15_units: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
        },
        temperature_2m: {
          type: 'string',
        },
        relative_humidity_2m: {
          type: 'string',
        },
        dew_point_2m: {
          type: 'string',
        },
        apparent_temperature: {
          type: 'string',
        },
        precipitation: {
          type: 'string',
        },
        rain: {
          type: 'string',
        },
        snowfall: {
          type: 'string',
        },
        snowfall_height: {
          type: 'string',
        },
        freezing_level_height: {
          type: 'string',
        },
        sunshine_duration: {
          type: 'string',
        },
        weather_code: {
          type: 'string',
        },
        wind_speed_10m: {
          type: 'string',
        },
        wind_speed_20m: {
          type: 'string',
        },
        wind_speed_50m: {
          type: 'string',
        },
        wind_speed_80m: {
          type: 'string',
        },
        wind_speed_100m: {
          type: 'string',
        },
        wind_direction_10m: {
          type: 'string',
        },
        wind_direction_20m: {
          type: 'string',
        },
        wind_direction_50m: {
          type: 'string',
        },
        wind_direction_80m: {
          type: 'string',
        },
        wind_direction_100m: {
          type: 'string',
        },
        wind_gusts_10m: {
          type: 'string',
        },
        visibility: {
          type: 'string',
        },
        cape: {
          type: 'string',
        },
        lightning_potential: {
          type: 'string',
        },
        is_day: {
          type: 'string',
        },
      },
    },
  },
};

function _validateResponse(value: unknown): GetV1ForecastResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `GetV1Forecast response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as GetV1ForecastResponse;
}

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
        httpResource<GetV1ForecastResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/v1/forecast`,
              params: _serializeParams(_params) as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
          { parse: _validateResponse },
        );
    },
  };
}
