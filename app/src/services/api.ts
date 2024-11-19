export default async function fetchApi<T>(options: { url: string, options?: RequestInit, body?: any }): Promise<T> {
  try {
    const request = await fetch(options.url, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : null
    })

    if (!request.ok) {
      throw new Error(`request failed: status ${request.status}`)
    }

    return await request.json() as T
  } catch (error: any) {
    throw new Error(`error fetching data: ${error.message}`)
  }
}