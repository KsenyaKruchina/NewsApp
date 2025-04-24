module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest.setup.js'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'app/**/*.{ts,tsx}',
      '!app/**/*.test.{ts,tsx}',
      '!app/_layout.tsx'
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/app/$1'
    },
    testEnvironment: 'jsdom'
  };