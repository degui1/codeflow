export function apiCall(
  method: HttpMethod,
  path: string,
  body?: object,
  headers?: object,
): Promise<Response> {
  return fetch(API_URL + path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  })
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
const API_URL = import.meta.env.VITE_API_BASE_URL

export function apiAuth() {
  window.location.href = 'http://localhost:3000' + '/auth/github'
}
