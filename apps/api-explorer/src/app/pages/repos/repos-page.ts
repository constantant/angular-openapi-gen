import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  USERS_GET_BY_USERNAME,
  REPOS_LIST_FOR_USER,
} from '@angular-openapi-gen/github-data-access';

@Component({
  selector: 'app-repos-page',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './repos-page.html',
})
export class ReposPageComponent {
  private getUser = inject(USERS_GET_BY_USERNAME);
  private listRepos = inject(REPOS_LIST_FOR_USER);

  readonly user = this.getUser('angular');
  readonly repos = this.listRepos('angular');
}
