/* eslint-env node */

module.exports = {
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsconfig: {
        module: 'commonjs',
      },
    },
  },
  preset: 'ts-jest',
};
