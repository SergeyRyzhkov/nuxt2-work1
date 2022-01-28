import type { Config } from "@jest/types";

const ignorePaths = ["<rootDir>/dist/", "<rootDir>/.nuxt", "<rootDir>/.vscode", "<rootDir>/node_modules/"];

const config: Config.InitialOptions = {
  // preset: "ts-jest",
  // testEnvironment: "jsdom",
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$",
  // extensionsToTreatAsEsm: [".ts"],

  // globals: {
  //   "ts-jest": {
  //     useESM: true,
  //   },
  // },
  // moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx", "node"],
  // // transform: {
  // // "^.+\\.(vue$)": "<rootDir>/node_modules/vue-jest",
  // // ".*\\.(js)$": "<rootDir>/node_modules/babel-jest",
  // // "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
  // // ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub",
  // // },

  // transform: {
  //   "^.+\\js$": "babel-jest",
  //   "^.+\\.ts$": "ts-jest",
  //   "^.+\\.vue$": "@vue/vue2-jest",
  //   ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  // },
  // roots: ["<rootDir>/src"],

  // // transformIgnorePatterns: ["node_modules/(?!(some-module|another-module))"]
  // // transformIgnorePatterns: ["<rootDir>/node_modules/(?!your-module-name)"],
  // moduleDirectories: ["<rootDir>/node_modules"],
  // moduleNameMapper: {
  //   "^@/(.*)$": "<rootDir>/src/$1",
  //   "^~/(.*)$": "<rootDir>/src/$1",
  //   "^vue$": "vue/dist/vue.common.js",
  // },

  // snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],

  // collectCoverage: false,
  // collectCoverageFrom: ["<rootDir>/src/modules/**/*.vue", "<rootDir>/src/modules/**/*.ts"],
  // // modulePathIgnorePatterns: ignorePaths,
  // testPathIgnorePatterns: ignorePaths,
  // coveragePathIgnorePatterns: ignorePaths,

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/modules/**/*.vue", "<rootDir>/src/modules/**/*.ts"],
  testEnvironment: "jsdom",
};

export default config;
