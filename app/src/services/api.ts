import { parseLocalUser } from "../utils/user";

export default async function fetchApi<T>(options: { url: string, options?: RequestInit, body?: any }): Promise<T> {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const body = options.body && options.options?.method !== 'GET' ? JSON.stringify(options.body) : undefined;
    const token = parseLocalUser()?.token;

    if (!token) {
      throw new Error('missing auth token (session expired?)');
    }

    const request = await fetch(`${baseUrl}${options.url}`, {
      ...options.options,
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': token
      },
      body: body
    });
    const data = await request.json();
    if (!request.ok) {
      throw new Error(data.error);
    }

    return data as T
  } catch (error: any) {
    throw new Error(error.message);
  }
}