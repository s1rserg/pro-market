const ApiPath = {
  API_URL: import.meta.env.API_PATH || 'http://localhost:3000',

  // Auth routes
  AUTH: '/auth',
  AUTHENTICATED_USER: '/authenticated-user',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

export { ApiPath };
