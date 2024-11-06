const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  video: false,
  screenshotOnRunFailure: false,
  env: {
    user: {
      email: 'your_email@zesty.io',
      password: 'password',
    },
    'cypress-plugin-snapshots': {
      autoCleanUp: false,
      autopassNewSnapshots: true,
      diffLines: 3,
      excludeFields: [],
      ignoreExtraArrayItems: false,
      ignoreExtraFields: false,
      normalizeJson: true,
      prettier: true,
      imageConfig: {
        createDiffImage: true,
        resizeDevicePixelRatio: true,
        threshold: 0.01,
        thresholdType: 'percent',
      },
      screenshotConfig: {
        blackout: [],
        capture: 'fullPage',
        clip: null,
        disableTimersAndAnimations: true,
        log: false,
        scale: false,
        timeout: 30000,
      },
      serverEnabled: true,
      serverHost: 'localhost',
      serverPort: 2121,
      updateSnapshots: false,
      backgroundBlend: 'difference',
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://test.zesty.io:3000',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
});
