import { describe, it, expect } from 'vitest';
import { ensurePackageInstalled } from './ensure-package';

describe('ensurePackageInstalled', () => {
  it('passes for an installed package', () => {
    expect(() => ensurePackageInstalled('js-yaml', 'someOption')).not.toThrow();
  });

  it('names the option and package, with a plain install hint', () => {
    expect(() => ensurePackageInstalled('definitely-not-installed-pkg', 'validateResponses')).toThrow(
      'validateResponses requires definitely-not-installed-pkg to be installed.\n' +
        'Run: npm install definitely-not-installed-pkg',
    );
  });

  it('suggests -D for dev dependencies', () => {
    expect(() =>
      ensurePackageInstalled('definitely-not-installed-pkg', 'includeMocks', { dev: true }),
    ).toThrow('Run: npm install -D definitely-not-installed-pkg');
  });
});
