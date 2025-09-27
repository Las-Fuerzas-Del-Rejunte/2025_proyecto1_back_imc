module.exports = {
  testMatch: ["**/test/**/*.spec.ts"],
  transform: { "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }] },
  moduleFileExtensions: ["ts","js","json"],
  testEnvironment: "node",
  verbose: true,
  reporters: ["default", "<rootDir>/test/reporters/friendly-reporter.js"],
};