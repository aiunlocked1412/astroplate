import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Get credentials from environment variables
    const adminUsername = import.meta.env.ADMIN_USERNAME || 'lnw1';
    const adminPassword = import.meta.env.ADMIN_PASSWORD || 'zzzzzz55';

    // Debug log (remove in production)
    console.log('Login attempt:', {
      providedUsername: username,
      expectedUsername: adminUsername,
      hasPassword: !!password,
      envLoaded: !!import.meta.env.ADMIN_USERNAME,
    });

    // Check credentials
    if (username === adminUsername && password === adminPassword) {
      // Set session cookie
      cookies.set('admin_session', 'authenticated', {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: 'lax',
      });

      return new Response(
        JSON.stringify({ success: true, message: 'เข้าสู่ระบบสำเร็จ' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'เกิดข้อผิดพลาด',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
