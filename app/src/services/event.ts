import fetchApi from "./api"

export const EventService = {
  path: '/api/events',
  list() {
    return fetchApi<User>({
      url: `${this.path}/`,
      options: {
        method: 'POST',
      },
    });
  },
  create(name: string, description: string, when: string) {
    return fetchApi<User>({
      url: `${this.path}/`,
      options: {
        method: 'POST',
      },
      body: {
        name,
        description,
        when
      }
    });
  }
}