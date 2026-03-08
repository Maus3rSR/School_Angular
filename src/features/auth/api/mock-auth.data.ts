import { LoginCredentials } from '../auth.model';

export const MOCK_AUTH_ACCOUNT = {
  id: 1,
  name: 'Prof WishFlix',
  email: 'teacher@wishflix.dev',
} as const;

export const MOCK_AUTH_PASSWORD = 'wishflix123';

export const MOCK_AUTH_CREDENTIALS: LoginCredentials = {
  email: MOCK_AUTH_ACCOUNT.email,
  password: MOCK_AUTH_PASSWORD,
};
