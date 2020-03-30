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
  // collectCoverage: true,
  // collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"]  // https://vue-test-utils.vuejs.org/zh/guides/#%E7%94%A8-jest-%E6%B5%8B%E8%AF%95%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6 测试覆盖率
}
