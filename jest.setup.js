import { server } from '@/mocks/server';
import "@testing-library/jest-native/extend-expect"

jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

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
