// First-party proxy for GA4's collect beacon. Browsers (Safari ITP, ad-blockers, privacy
// DNS) increasingly block any request to google-analytics.com outright, even with no
// cookies involved and consent granted - the domain itself is blocklisted. Routing the
// beacon through our own domain (set via gtag's `transport_url`) makes it indistinguishable
// from normal site traffic, which is Google's own documented workaround for this.
export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const target = `https://www.google-analytics.com/g/collect${url.search}`

  const body = event.method === 'POST' ? await readRawBody(event) : undefined
  const forwardedFor = getRequestHeader(event, 'x-forwarded-for') ?? event.node.req.socket.remoteAddress ?? ''

  const res = await fetch(target, {
    method: event.method,
    body,
    headers: {
      'user-agent': getRequestHeader(event, 'user-agent') ?? '',
      'x-forwarded-for': forwardedFor,
    },
  })

  setResponseStatus(event, res.status)
  return null
})
