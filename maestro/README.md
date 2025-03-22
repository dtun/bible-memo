# Maestro E2E Tests

This directory contains Maestro flows for end-to-end testing of the Bible Memo app.

## Running Tests Locally

1. Install the Maestro CLI:

   ```
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. Run the tests:
   ```
   maestro test maestro/launch.yaml
   ```

## Running Tests in CI

Tests are automatically run in GitHub Actions using Robin (formerly Maestro Cloud) when:

- A pull request is opened against the main branch
- Code is pushed to the main branch

### Required Secrets

To run tests in Robin, the following GitHub secrets must be configured:

- `ROBIN_API_KEY`: Your Robin API key
- `ROBIN_PROJECT_ID`: Your Robin project ID
- `EXPO_TOKEN`: Your Expo token for building the app

### Test Workflows

Two workflows have been set up:

1. `maestro-e2e.yml` - Runs tests on iOS
2. `maestro-e2e-android.yml` - Runs tests on Android

### Configuring Tests

- Add or modify test flows in the `maestro/` directory
- Update the workflow files as needed:
  - iOS version: Set the `ios-version` parameter
  - Android API level: Set the `android-api-level` parameter
  - Environment variables: Add them to the `env` parameter

## Test Files

- `launch.yaml`: Tests the app launch and initial screen
- `me.yaml`: Tests the profile screen
- `read.yaml`: Tests the reading experience
- `config.yaml`: Configuration for Maestro tests
