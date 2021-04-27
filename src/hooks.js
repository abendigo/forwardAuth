import * as cookie from 'cookie';

const SESSION_COOKIE = 'sid';
const contexts = {};

export async function getContext({ headers }) {
  const cookies = cookie.parse(headers.cookie || '');

  let sid = cookies[SESSION_COOKIE];
  let context = contexts[sid];

  if (!context) {
    const sid = Date.now(); // Don't do this in a real site!!
    context = contexts[sid] = { sid };
  }

  return context;
}

export async function handle( { request: { context, ...request }, render }) {
  const { headers, ...response } = await render({ ...request, context });

  if (context.sid) {
    headers['set-cookie'] = [cookie.serialize(SESSION_COOKIE, context.sid, {
      httpOnly: true, domain: 'docker.localhost', path: '/'
    })];
  }

  return { ...response, headers };
}
