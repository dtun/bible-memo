import "@testing-library/jest-native/extend-expect"

import { server } from '@/mocks/server';

beforeAll(() => {
  jest.useFakeTimers();
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
  jest.useRealTimers();
});
