import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetBranchRulesParams =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['parameters']['query'];

export type ReposGetBranchRulesResponse =
  paths['/repos/{owner}/{repo}/rules/branches/{branch}']['get']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  type: 'array',
  items: {
    title: 'Repository Rule',
    type: 'object',
    description: 'A repository rule with ruleset details.',
    oneOf: [
      {
        allOf: [
          {
            title: 'creation',
            description:
              'Only allow users with bypass permission to create matching refs.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['creation'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'update',
            description:
              'Only allow users with bypass permission to update matching refs.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['update'],
              },
              parameters: {
                type: 'object',
                properties: {
                  update_allows_fetch_and_merge: {
                    type: 'boolean',
                    description:
                      'Branch can pull changes from its upstream repository',
                  },
                },
                required: ['update_allows_fetch_and_merge'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'deletion',
            description:
              'Only allow users with bypass permissions to delete matching refs.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['deletion'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'required_linear_history',
            description:
              'Prevent merge commits from being pushed to matching refs.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['required_linear_history'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'merge_queue',
            description: 'Merges must be performed via a merge queue.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['merge_queue'],
              },
              parameters: {
                type: 'object',
                properties: {
                  check_response_timeout_minutes: {
                    type: 'integer',
                    description:
                      'Maximum time for a required status check to report a conclusion. After this much time has elapsed, checks that have not reported a conclusion will be assumed to have failed',
                    minimum: 1,
                    maximum: 360,
                  },
                  grouping_strategy: {
                    type: 'string',
                    description:
                      'When set to ALLGREEN, the merge commit created by merge queue for each PR in the group must pass all required checks to merge. When set to HEADGREEN, only the commit at the head of the merge group, i.e. the commit containing changes from all of the PRs in the group, must pass its required checks to merge.',
                    enum: ['ALLGREEN', 'HEADGREEN'],
                  },
                  max_entries_to_build: {
                    type: 'integer',
                    description:
                      'Limit the number of queued pull requests requesting checks and workflow runs at the same time.',
                    minimum: 0,
                    maximum: 100,
                  },
                  max_entries_to_merge: {
                    type: 'integer',
                    description:
                      'The maximum number of PRs that will be merged together in a group.',
                    minimum: 0,
                    maximum: 100,
                  },
                  merge_method: {
                    type: 'string',
                    description:
                      'Method to use when merging changes from queued pull requests.',
                    enum: ['MERGE', 'SQUASH', 'REBASE'],
                  },
                  min_entries_to_merge: {
                    type: 'integer',
                    description:
                      'The minimum number of PRs that will be merged together in a group.',
                    minimum: 0,
                    maximum: 100,
                  },
                  min_entries_to_merge_wait_minutes: {
                    type: 'integer',
                    description:
                      'The time merge queue should wait after the first PR is added to the queue for the minimum group size to be met. After this time has elapsed, the minimum group size will be ignored and a smaller group will be merged.',
                    minimum: 0,
                    maximum: 360,
                  },
                },
                required: [
                  'check_response_timeout_minutes',
                  'grouping_strategy',
                  'max_entries_to_build',
                  'max_entries_to_merge',
                  'merge_method',
                  'min_entries_to_merge',
                  'min_entries_to_merge_wait_minutes',
                ],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'required_deployments',
            description:
              'Choose which environments must be successfully deployed to before refs can be pushed into a ref that matches this rule.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['required_deployments'],
              },
              parameters: {
                type: 'object',
                properties: {
                  required_deployment_environments: {
                    type: 'array',
                    description:
                      'The environments that must be successfully deployed to before branches can be merged.',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['required_deployment_environments'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'required_signatures',
            description:
              'Commits pushed to matching refs must have verified signatures.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['required_signatures'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'pull_request',
            description:
              'Require all commits be made to a non-target branch and submitted via a pull request before they can be merged.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['pull_request'],
              },
              parameters: {
                type: 'object',
                properties: {
                  allowed_merge_methods: {
                    type: 'array',
                    description:
                      'Array of allowed merge methods. Allowed values include `merge`, `squash`, and `rebase`. At least one option must be enabled.',
                    items: {
                      type: 'string',
                      enum: ['merge', 'squash', 'rebase'],
                    },
                  },
                  dismiss_stale_reviews_on_push: {
                    type: 'boolean',
                    description:
                      'New, reviewable commits pushed will dismiss previous pull request review approvals.',
                  },
                  require_code_owner_review: {
                    type: 'boolean',
                    description:
                      'Require an approving review in pull requests that modify files that have a designated code owner.',
                  },
                  require_last_push_approval: {
                    type: 'boolean',
                    description:
                      'Whether the most recent reviewable push must be approved by someone other than the person who pushed it.',
                  },
                  required_approving_review_count: {
                    type: 'integer',
                    description:
                      'The number of approving reviews that are required before a pull request can be merged.',
                    minimum: 0,
                    maximum: 10,
                  },
                  required_review_thread_resolution: {
                    type: 'boolean',
                    description:
                      'All conversations on code must be resolved before a pull request can be merged.',
                  },
                  required_reviewers: {
                    type: 'array',
                    description:
                      '> [!NOTE]\n> `required_reviewers` is in beta and subject to change.\n\nA collection of reviewers and associated file patterns. Each reviewer has a list of file patterns which determine the files that reviewer is required to review.',
                    items: {
                      title: 'RequiredReviewerConfiguration',
                      description:
                        'A reviewing team, and file patterns describing which files they must approve changes to.',
                      type: 'object',
                      properties: {
                        file_patterns: {
                          type: 'array',
                          description:
                            'Array of file patterns. Pull requests which change matching files must be approved by the specified team. File patterns use fnmatch syntax.',
                          items: {
                            type: 'string',
                          },
                        },
                        minimum_approvals: {
                          type: 'integer',
                          description:
                            'Minimum number of approvals required from the specified team. If set to zero, the team will be added to the pull request but approval is optional.',
                        },
                        reviewer: {
                          title: 'Reviewer',
                          description: 'A required reviewing team',
                          type: 'object',
                          properties: {
                            id: {
                              type: 'integer',
                              description:
                                'ID of the reviewer which must review changes to matching files.',
                            },
                            type: {
                              type: 'string',
                              description: 'The type of the reviewer',
                              enum: ['Team'],
                            },
                          },
                          required: ['id', 'type'],
                        },
                      },
                      required: [
                        'file_patterns',
                        'minimum_approvals',
                        'reviewer',
                      ],
                    },
                  },
                },
                required: [
                  'dismiss_stale_reviews_on_push',
                  'require_code_owner_review',
                  'require_last_push_approval',
                  'required_approving_review_count',
                  'required_review_thread_resolution',
                ],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'required_status_checks',
            description:
              'Choose which status checks must pass before the ref is updated. When enabled, commits must first be pushed to another ref where the checks pass.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['required_status_checks'],
              },
              parameters: {
                type: 'object',
                properties: {
                  do_not_enforce_on_create: {
                    type: 'boolean',
                    description:
                      'Allow repositories and branches to be created if a check would otherwise prohibit it.',
                  },
                  required_status_checks: {
                    type: 'array',
                    description: 'Status checks that are required.',
                    items: {
                      title: 'StatusCheckConfiguration',
                      description: 'Required status check',
                      type: 'object',
                      properties: {
                        context: {
                          type: 'string',
                          description:
                            'The status check context name that must be present on the commit.',
                        },
                        integration_id: {
                          type: 'integer',
                          description:
                            'The optional integration ID that this status check must originate from.',
                        },
                      },
                      required: ['context'],
                    },
                  },
                  strict_required_status_checks_policy: {
                    type: 'boolean',
                    description:
                      'Whether pull requests targeting a matching branch must be tested with the latest code. This setting will not take effect unless at least one status check is enabled.',
                  },
                },
                required: [
                  'required_status_checks',
                  'strict_required_status_checks_policy',
                ],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'non_fast_forward',
            description:
              'Prevent users with push access from force pushing to refs.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['non_fast_forward'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'commit_message_pattern',
            description:
              'Parameters to be used for the commit_message_pattern rule',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['commit_message_pattern'],
              },
              parameters: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'How this rule appears when configuring it.',
                  },
                  negate: {
                    type: 'boolean',
                    description:
                      'If true, the rule will fail if the pattern matches.',
                  },
                  operator: {
                    type: 'string',
                    description: 'The operator to use for matching.',
                    enum: ['starts_with', 'ends_with', 'contains', 'regex'],
                  },
                  pattern: {
                    type: 'string',
                    description: 'The pattern to match with.',
                  },
                },
                required: ['operator', 'pattern'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'commit_author_email_pattern',
            description:
              'Parameters to be used for the commit_author_email_pattern rule',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['commit_author_email_pattern'],
              },
              parameters: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'How this rule appears when configuring it.',
                  },
                  negate: {
                    type: 'boolean',
                    description:
                      'If true, the rule will fail if the pattern matches.',
                  },
                  operator: {
                    type: 'string',
                    description: 'The operator to use for matching.',
                    enum: ['starts_with', 'ends_with', 'contains', 'regex'],
                  },
                  pattern: {
                    type: 'string',
                    description: 'The pattern to match with.',
                  },
                },
                required: ['operator', 'pattern'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'committer_email_pattern',
            description:
              'Parameters to be used for the committer_email_pattern rule',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['committer_email_pattern'],
              },
              parameters: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'How this rule appears when configuring it.',
                  },
                  negate: {
                    type: 'boolean',
                    description:
                      'If true, the rule will fail if the pattern matches.',
                  },
                  operator: {
                    type: 'string',
                    description: 'The operator to use for matching.',
                    enum: ['starts_with', 'ends_with', 'contains', 'regex'],
                  },
                  pattern: {
                    type: 'string',
                    description: 'The pattern to match with.',
                  },
                },
                required: ['operator', 'pattern'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'branch_name_pattern',
            description:
              'Parameters to be used for the branch_name_pattern rule',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['branch_name_pattern'],
              },
              parameters: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'How this rule appears when configuring it.',
                  },
                  negate: {
                    type: 'boolean',
                    description:
                      'If true, the rule will fail if the pattern matches.',
                  },
                  operator: {
                    type: 'string',
                    description: 'The operator to use for matching.',
                    enum: ['starts_with', 'ends_with', 'contains', 'regex'],
                  },
                  pattern: {
                    type: 'string',
                    description: 'The pattern to match with.',
                  },
                },
                required: ['operator', 'pattern'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'tag_name_pattern',
            description: 'Parameters to be used for the tag_name_pattern rule',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['tag_name_pattern'],
              },
              parameters: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'How this rule appears when configuring it.',
                  },
                  negate: {
                    type: 'boolean',
                    description:
                      'If true, the rule will fail if the pattern matches.',
                  },
                  operator: {
                    type: 'string',
                    description: 'The operator to use for matching.',
                    enum: ['starts_with', 'ends_with', 'contains', 'regex'],
                  },
                  pattern: {
                    type: 'string',
                    description: 'The pattern to match with.',
                  },
                },
                required: ['operator', 'pattern'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'workflows',
            description:
              'Require all changes made to a targeted branch to pass the specified workflows before they can be merged.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['workflows'],
              },
              parameters: {
                type: 'object',
                properties: {
                  do_not_enforce_on_create: {
                    type: 'boolean',
                    description:
                      'Allow repositories and branches to be created if a check would otherwise prohibit it.',
                  },
                  workflows: {
                    type: 'array',
                    description:
                      'Workflows that must pass for this rule to pass.',
                    items: {
                      title: 'WorkflowFileReference',
                      description:
                        'A workflow that must run for this rule to pass',
                      type: 'object',
                      properties: {
                        path: {
                          type: 'string',
                          description: 'The path to the workflow file',
                        },
                        ref: {
                          type: 'string',
                          description:
                            'The ref (branch or tag) of the workflow file to use',
                        },
                        repository_id: {
                          type: 'integer',
                          description:
                            'The ID of the repository where the workflow is defined',
                        },
                        sha: {
                          type: 'string',
                          description:
                            'The commit SHA of the workflow file to use',
                        },
                      },
                      required: ['path', 'repository_id'],
                    },
                  },
                },
                required: ['workflows'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'code_scanning',
            description:
              'Choose which tools must provide code scanning results before the reference is updated. When configured, code scanning must be enabled and have results for both the commit and the reference being updated.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['code_scanning'],
              },
              parameters: {
                type: 'object',
                properties: {
                  code_scanning_tools: {
                    type: 'array',
                    description:
                      'Tools that must provide code scanning results for this rule to pass.',
                    items: {
                      title: 'CodeScanningTool',
                      description:
                        'A tool that must provide code scanning results for this rule to pass.',
                      type: 'object',
                      properties: {
                        alerts_threshold: {
                          type: 'string',
                          description:
                            'The severity level at which code scanning results that raise alerts block a reference update. For more information on alert severity levels, see "[About code scanning alerts](https://docs.github.com/code-security/code-scanning/managing-code-scanning-alerts/about-code-scanning-alerts#about-alert-severity-and-security-severity-levels)."',
                          enum: [
                            'none',
                            'errors',
                            'errors_and_warnings',
                            'all',
                          ],
                        },
                        security_alerts_threshold: {
                          type: 'string',
                          description:
                            'The severity level at which code scanning results that raise security alerts block a reference update. For more information on security severity levels, see "[About code scanning alerts](https://docs.github.com/code-security/code-scanning/managing-code-scanning-alerts/about-code-scanning-alerts#about-alert-severity-and-security-severity-levels)."',
                          enum: [
                            'none',
                            'critical',
                            'high_or_higher',
                            'medium_or_higher',
                            'all',
                          ],
                        },
                        tool: {
                          type: 'string',
                          description: 'The name of a code scanning tool',
                        },
                      },
                      required: [
                        'alerts_threshold',
                        'security_alerts_threshold',
                        'tool',
                      ],
                    },
                  },
                },
                required: ['code_scanning_tools'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'copilot_code_review',
            description:
              'Request Copilot code review for new pull requests automatically if the author has access to Copilot code review and their premium requests quota has not reached the limit.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['copilot_code_review'],
              },
              parameters: {
                type: 'object',
                properties: {
                  review_draft_pull_requests: {
                    type: 'boolean',
                    description:
                      'Copilot automatically reviews draft pull requests before they are marked as ready for review.',
                  },
                  review_on_push: {
                    type: 'boolean',
                    description:
                      'Copilot automatically reviews each new push to the pull request.',
                  },
                },
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'file_path_restriction',
            description:
              'Prevent commits that include changes in specified file and folder paths from being pushed to the commit graph. This includes absolute paths that contain file names.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['file_path_restriction'],
              },
              parameters: {
                type: 'object',
                properties: {
                  restricted_file_paths: {
                    type: 'array',
                    description:
                      'The file paths that are restricted from being pushed to the commit graph.',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['restricted_file_paths'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'max_file_path_length',
            description:
              'Prevent commits that include file paths that exceed the specified character limit from being pushed to the commit graph.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['max_file_path_length'],
              },
              parameters: {
                type: 'object',
                properties: {
                  max_file_path_length: {
                    type: 'integer',
                    description:
                      'The maximum amount of characters allowed in file paths.',
                    minimum: 1,
                    maximum: 32767,
                  },
                },
                required: ['max_file_path_length'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'file_extension_restriction',
            description:
              'Prevent commits that include files with specified file extensions from being pushed to the commit graph.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['file_extension_restriction'],
              },
              parameters: {
                type: 'object',
                properties: {
                  restricted_file_extensions: {
                    type: 'array',
                    description:
                      'The file extensions that are restricted from being pushed to the commit graph.',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['restricted_file_extensions'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
      {
        allOf: [
          {
            title: 'max_file_size',
            description:
              'Prevent commits with individual files that exceed the specified limit from being pushed to the commit graph.',
            type: 'object',
            required: ['type'],
            properties: {
              type: {
                type: 'string',
                enum: ['max_file_size'],
              },
              parameters: {
                type: 'object',
                properties: {
                  max_file_size: {
                    type: 'integer',
                    description:
                      'The maximum file size allowed in megabytes. This limit does not apply to Git Large File Storage (Git LFS).',
                    minimum: 1,
                    maximum: 100,
                  },
                },
                required: ['max_file_size'],
              },
            },
          },
          {
            title: 'repository ruleset data for rule',
            description:
              'User-defined metadata to store domain-specific information limited to 8 keys with scalar values.',
            properties: {
              ruleset_source_type: {
                type: 'string',
                description:
                  'The type of source for the ruleset that includes this rule.',
                enum: ['Repository', 'Organization'],
              },
              ruleset_source: {
                type: 'string',
                description:
                  'The name of the source of the ruleset that includes this rule.',
              },
              ruleset_id: {
                type: 'integer',
                description: 'The ID of the ruleset that includes this rule.',
              },
            },
          },
        ],
      },
    ],
  },
};

function _validateResponse(value: unknown): ReposGetBranchRulesResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `ReposGetBranchRules response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as ReposGetBranchRulesResponse;
}

export const REPOS_GET_BRANCH_RULES = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    params?:
      ReposGetBranchRulesParams | (() => ReposGetBranchRulesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetBranchRulesResponse>>
>('REPOS_GET_BRANCH_RULES');

export function provideReposGetBranchRules(): FactoryProvider {
  return {
    provide: REPOS_GET_BRANCH_RULES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        params?:
          | ReposGetBranchRulesParams
          | (() => ReposGetBranchRulesParams | undefined),
      ) =>
        httpResource<ReposGetBranchRulesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/repos/${owner}/${repo}/rules/branches/${branch}`,
              params: _params as unknown as Record<
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
