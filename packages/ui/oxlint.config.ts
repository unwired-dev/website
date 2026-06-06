import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  library: true,
  react: true,
  overrides: {
    ignorePatterns: ['dist/'],
    rules: {
      'import/consistent-type-specifier-style': 'allow',
      'react/forbid-component-props': 'allow',
    },
  },
});
