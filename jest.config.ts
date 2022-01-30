import type { Config } from "@jest/types";

const esModules = ["@nuxtjs/style-resources", "nuxt-webfontloader"].join("|");

const config: Config.InitialOptions = {
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esModules})/)`],

  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js",
  },

  transform: {
    "^.+\\.ts$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "babel-jest",
    // '^.+\\.js$': [
    //   'babel-jest',
    //   {
    //     presets: [
    //       ['@babel/preset-env', { targets: { node: 'current' } }],
    //       '@babel/preset-typescript'
    //     ],
    //     plugins: ['@babel/plugin-transform-runtime']
    //   }
    // ],
  },

  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/src/modules/**/*.vue", "<rootDir>/src/modules/**/*.ts"],
};

export default config;
