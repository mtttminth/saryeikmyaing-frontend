import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const hasAdminToken = request.cookies.get('admin')?.value;
    if (!hasAdminToken && request.nextUrl.pathname !== '/home') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
}

export const config = {
  matcher: [
    '/',
    '/home',
  ],
};