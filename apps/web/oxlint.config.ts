import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  react: true,
  overrides: {
    ignorePatterns: ['.next/', 'out/', 'next-env.d.ts'],
    rules: {
      'node/no-process-env': 'allow',
      'react/forbid-component-props': 'allow',
      'typescript/prefer-readonly-parameter-types': 'allow',
    },
  },
});
