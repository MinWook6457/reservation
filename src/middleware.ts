import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { SessionPayload } from '@/types';

// Edge-compatible session decoding (no Node.js crypto)
// We use a simple base64 decode without signature verification in middleware
// The actual signature verification happens in the API route handlers via auth.ts
function decodeSessionLite(token: string): SessionPayload | null {
  try {
    const [payload] = token.split('.');
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const data = JSON.parse(json) as SessionPayload;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? decodeSessionLite(token) : null;

  // API routes - return JSON errors
  if (pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }
    if (session.role !== 'admin') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/reservations')) {
    if (!session) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Page routes - redirect to login
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/reservation')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/reservation/:path*', '/admin/:path*', '/api/reservations/:path*', '/api/admin/:path*'],
};
