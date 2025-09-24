export async function request(
  method: HttpMethod,
  path: string,
  body?: object,
  headers?: object,
): Promise<Response> {
  const response = await fetch(API_URL + path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()

    if (import.meta.env.DEV) {
      console.error(error)
    }

    throw new Error(error.message)
  }

  return response
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
const API_URL = import.meta.env.VITE_API_BASE_URL

export function auth() {
  window.location.href = API_URL + '/auth/github'
}
