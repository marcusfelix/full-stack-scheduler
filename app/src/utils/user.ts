export const parseLocalUser = (): User | null => {
  try {
    return JSON.parse(sessionStorage.getItem("scheduler-user") ?? "null");
  } catch (error) {
    return null;
  }
}

export const writeLocalUser = (user: User): void => {
  return sessionStorage.setItem('scheduler-user', JSON.stringify(user))
}