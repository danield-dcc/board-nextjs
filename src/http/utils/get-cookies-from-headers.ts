export function getCookiesFromHeaders(headers: HeadersInit) {
  const ongoingHeaders = new Headers

  const incomingHeaders = new Headers(headers)
  const cookie = incomingHeaders.get('cookie')

  ongoingHeaders.set('Content-Type', 'application/json')

  if (cookie) {
    ongoingHeaders.set('cookie', cookie)
  }

  return ongoingHeaders
}