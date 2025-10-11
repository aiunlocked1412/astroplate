import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Check if the request is for an admin page (but not login or API)
  if (url.pathname.startsWith('/admin') &&
      url.pathname !== '/admin/login' &&
      !url.pathname.startsWith('/api/')) {

    // Check if user is authenticated
    const session = cookies.get('admin_session');

    if (!session || session.value !== 'authenticated') {
      // Not authenticated, redirect to login
      return redirect('/admin/login');
    }
  }

  // If authenticated or not an admin page, continue
  return next();
});
