const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'e16w6c',
  e2e: {
    baseUrl: 'http://localhost:8888',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})