export async function get({ headers, context }) {
  const forwardedHost = headers['x-forwarded-host'];
  const forwardedUri = headers['x-forwarded-uri'];

  if (context.authenticated === true) {
    return {
      status: 200,
      body: 'OK'
    };
  }

  return {
    status: 302,
    headers: { location: `http://auth.docker.localhost/login?dest=${forwardedHost}${forwardedUri}` },
    body: 'OK'
  };
}
