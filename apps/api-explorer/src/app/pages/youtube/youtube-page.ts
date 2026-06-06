import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { YOUTUBE_SEARCH_LIST, YoutubeSearchListResponse } from '@angular-openapi-gen/youtube-data-access';
import { YOUTUBE_API_KEY } from '../../app.config';

type SearchItem = NonNullable<YoutubeSearchListResponse['items']>[number];

@Component({
  selector: 'app-youtube-page',
  imports: [
    DecimalPipe,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './youtube-page.html',
  styleUrl: './youtube-page.less',
})
export class YoutubePageComponent {
  private searchYoutube = inject(YOUTUBE_SEARCH_LIST);
  readonly apiKey = inject(YOUTUBE_API_KEY);

  readonly query = signal('Angular');
  readonly inputValue = signal('Angular');

  readonly results = this.searchYoutube(() =>
    this.apiKey() && this.query()
      ? { q: this.query(), part: ['snippet'], maxResults: 12, type: ['video'] }
      : undefined
  );

  readonly videos = computed(() =>
    ((this.results.value() as YoutubeSearchListResponse)?.items ?? []) as SearchItem[]
  );

  readonly totalResults = computed(
    () => (this.results.value() as YoutubeSearchListResponse)?.pageInfo?.totalResults ?? 0
  );

  submit(): void {
    this.query.set(this.inputValue());
  }

  thumbnailUrl(item: SearchItem): string {
    const t = item.snippet?.thumbnails;
    return t?.medium?.url ?? t?.high?.url ?? t?.standard?.url ?? '';
  }

  videoUrl(item: SearchItem): string {
    return `https://www.youtube.com/watch?v=${item.id?.videoId}`;
  }
}
