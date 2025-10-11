import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  // Delete session cookie
  cookies.delete('admin_session', {
    path: '/',
  });

  return new Response(
    JSON.stringify({ success: true, message: 'ออกจากระบบสำเร็จ' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
