export const post = async ({ body, query, context }) => {
  const username = body.get('username');
  const password = body.get('password');

  const dest = query.get('dest');

  // High Security!!
  if (username === 'test' && password === 'test') {
    context.authenticated = true;

    return {
      status: 302,
      headers: {
        location: `http://${dest}`
      },
      body: 'OK'
    };
  }

  return {
    status: 401,
    body: 'Invalid Username/Password'
  }
}
