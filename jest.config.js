const CI = process.env.CI
module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-preprocess.js',
    '^.+\\.svg$': '<rootDir>/config/jest/svgrTransform.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.js',
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'cypress', 'examples'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/loadershim.js'],
  reporters: ['default'].concat(CI ? [['jest-junit', {outputDirectory: 'test-results/jest'}]] : []),
}
