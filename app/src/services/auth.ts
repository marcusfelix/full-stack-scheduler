import fetchApi from "./api"

export const AuthService = {
  path: '/api/auth',
  login(email: string, password: string) {
    return fetchApi<User>({
      url: `${this.path}/login`,
      options: {
        method: 'POST',
      },
      body: {
        email,
        password
      }
    });
  },
  create(email: string, password: string) {
    return fetchApi<User>({
      url: `${this.path}/create`,
      options: {
        method: 'POST',
      },
      body: {
        email,
        password
      }
    });
  }
}