import { Component, effect, inject } from '@angular/core';
import {
  USERS_GET_BY_USERNAME,
  REPOS_LIST_FOR_USER,
} from '@angular-openapi-gen/github-data-access';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { describeResourceError, logResourceError } from '../../resource-error.util';

@Component({
  selector: 'app-repos-page',
  imports: [MatCardModule, MatListModule, MatProgressBarModule, MatChipsModule],
  templateUrl: './repos-page.html',
  styleUrl: './repos-page.less',
})
export class ReposPageComponent {
  readonly describeError = describeResourceError;

  private getUser = inject(USERS_GET_BY_USERNAME);
  private listRepos = inject(REPOS_LIST_FOR_USER);

  readonly user = this.getUser('angular');
  readonly repos = this.listRepos('angular');

  private readonly logUserError = effect(() => {
    const error = this.user.error();
    if (error) logResourceError('github/user', error);
  });
  private readonly logReposError = effect(() => {
    const error = this.repos.error();
    if (error) logResourceError('github/repos', error);
  });
}
