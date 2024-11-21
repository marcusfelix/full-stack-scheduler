export const parseLocalUser = (): User | null => {
  try {
    const user = JSON.parse(sessionStorage.getItem('scheduler-user') ?? 'null');

    if ((new Date(user.created).getTime() + user.exp) < new Date().getTime) {
      sessionStorage.removeItem('scheduler-user')
      return null;
    }

    return user as User | null;
  } catch (error) {
    return null;
  }
}

export const writeLocalUser = (user: User): void => {
  return sessionStorage.setItem('scheduler-user', JSON.stringify(user))
}

export const parseJwt = (token: string): User => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const user = JSON.parse(jsonPayload) as User;

  return { ...user, ...{ token: token } };
}