import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  node: true,
  overrides: {
    ignorePatterns: ['dist/'],
    rules: {
      'typescript/prefer-readonly-parameter-types': 'allow',
    },
  },
});
