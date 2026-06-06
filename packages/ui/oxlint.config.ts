import { buildOxlintConfig } from '@rajzik/oxlint-config';

export default buildOxlintConfig({
  library: true,
  react: true,
  overrides: {
    ignorePatterns: ['dist/'],
    rules: {
      'react/forbid-component-props': 'allow',
    },
  },
});
