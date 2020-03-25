module.exports = {
  preset: '@vue/cli-plugin-unit-jest',

  // 以下配置是自定义配置，相同的会覆盖上面的配置
  testPathIgnorePatterns: [
    // '\.eslintrc\.js'
    '.eslintrc.js'
  ],
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)'
  ]
}
