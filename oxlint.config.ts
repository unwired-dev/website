import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  overrides: {
    ignorePatterns: [
      'apps/**',
      'packages/**',
      'out/',
      '.next/',
      '.turbo/',
    ],
  },
});
