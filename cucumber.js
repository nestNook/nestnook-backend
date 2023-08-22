const common = [
  'tests/components/**/*.feature',
  '--require-module ts-node/register',
  '--require tests/components/**/*.ts',
  '--parallel 2',
].join(' ');

module.exports = {
  default: common,
};
