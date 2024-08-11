import { server } from '@/mocks/server';
import "@testing-library/jest-native/extend-expect"

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
