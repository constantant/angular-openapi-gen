import { Component, computed, inject } from '@angular/core';
import { GET_V1_FORECAST } from '@angular-openapi-gen/weather-data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';

function weatherEmoji(code: number): string {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  return '⛈️';
}

function weatherLabel(code: number): string {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 48) return 'Foggy';
  if (code <= 55) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  return 'Thunderstorm';
}

function formatDay(dateStr: string, index: number): string {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en', { weekday: 'long' });
}

interface DayForecast {
  label: string;
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  emoji: string;
  condition: string;
}

interface CurrentConditions {
  temperature: number;
  windSpeed: number;
  emoji: string;
  condition: string;
}

@Component({
  selector: 'app-weather-page',
  imports: [MatProgressBarModule],
  templateUrl: './weather-page.html',
  styleUrl: './weather-page.less',
})
export class WeatherPageComponent {
  private getForecast = inject(GET_V1_FORECAST);

  readonly forecast = this.getForecast({
    latitude: '52.374',
    longitude: '4.89',
    current: ['temperature_2m', 'wind_speed_10m', 'weather_code'],
    daily: ['temperature_2m_max', 'temperature_2m_min', 'precipitation_sum', 'weather_code'],
    timezone: 'Europe/Amsterdam',
    forecast_days: 3,
  });

  readonly current = computed<CurrentConditions | null>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v = this.forecast.value() as any;
    if (!v?.current) return null;
    const code = v.current.weather_code ?? 0;
    return {
      temperature: Math.round(v.current.temperature_2m),
      windSpeed: Math.round(v.current.wind_speed_10m),
      emoji: weatherEmoji(code),
      condition: weatherLabel(code),
    };
  });

  readonly days = computed<DayForecast[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v = this.forecast.value() as any;
    const d = v?.daily;
    if (!d?.time) return [];
    return (d.time as string[]).map((dateStr: string, i: number) => {
      const code = d.weather_code?.[i] ?? 0;
      return {
        label: formatDay(dateStr, i),
        date: new Date(dateStr + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        tempMax: Math.round(d.temperature_2m_max[i]),
        tempMin: Math.round(d.temperature_2m_min[i]),
        precipitation: d.precipitation_sum[i] ?? 0,
        emoji: weatherEmoji(code),
        condition: weatherLabel(code),
      };
    });
  });
}
