/**
 * Throws a descriptive error when an optional peer package that a generator option
 * depends on isn't installed. Kept in its own module so tests can stub it.
 */
export function ensurePackageInstalled(
  pkg: string,
  option: string,
  { dev = false }: { dev?: boolean } = {},
): void {
  try {
    require.resolve(pkg);
  } catch {
    throw new Error(
      `${option} requires ${pkg} to be installed.\n` +
        `Run: npm install ${dev ? '-D ' : ''}${pkg}`,
    );
  }
}
