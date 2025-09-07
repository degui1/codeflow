export const getCookie = (name: string) => {
  const cookie: string | undefined = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))

  if (cookie) {
    return cookie.split('=')[1]
  }
  return null
}
