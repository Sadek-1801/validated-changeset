module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/support/setup.ts'],
  // WarpDrive ships ES modules. Its browser build has its build-time macros
  // already applied, so it runs outside an Ember app once transpiled.
  moduleNameMapper: {
    '^@warp-drive/(core|json-api)$':
      '<rootDir>/node_modules/@warp-drive/$1/dist/unpkg/dev/index.js',
    '^@warp-drive/(core|json-api)/(.*)$':
      '<rootDir>/node_modules/@warp-drive/$1/dist/unpkg/dev/$2.js'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '/@warp-drive/.+\\.js$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!\\.pnpm/@warp-drive|@warp-drive/)'],
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true,
        // The `node` resolution in tsconfig.json cannot read WarpDrive's
        // package exports, so point the tests at its types directly.
        baseUrl: '.',
        paths: {
          '@warp-drive/core': ['node_modules/@warp-drive/core/dist/index.d.ts'],
          '@warp-drive/core/*': ['node_modules/@warp-drive/core/dist/*'],
          '@warp-drive/json-api': ['node_modules/@warp-drive/json-api/dist/index.d.ts']
        }
      }
    }
  }
};
