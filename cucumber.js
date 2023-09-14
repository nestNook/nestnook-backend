module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['tests/components/**/*.ts'],
    paths: ['tests/components/**/*.feature'],
    format: ['html:./reports/component/cucumber-report.html'],
  },
};
