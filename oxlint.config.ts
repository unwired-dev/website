import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  react: true,
  overrides: {
    ignorePatterns: ['out/', 'next-env.d.ts'],
    rules: {
      'react/forbid-component-props': 'allow',
      'typescript/prefer-readonly-parameter-types': 'allow',
    },
  },
});
