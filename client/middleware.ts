import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If user is not logged in, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Get the user role from the token
  const userRole = token.role as string || 'Customer';

  // Handle base dashboard redirect
  if (path === '/dashboard') {
    if (userRole === 'Vendor') {
      return NextResponse.redirect(new URL('/dashboard/vendor', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard/customer', request.url));
    }
  }

  // Check permissions for specific dashboard paths
  if (path.startsWith('/dashboard/vendor') && userRole !== 'Vendor') {
    return NextResponse.redirect(new URL('/dashboard/access-denied', request.url));
  }

  if (path.startsWith('/dashboard/customer') && userRole !== 'Customer') {
    return NextResponse.redirect(new URL('/dashboard/access-denied', request.url));
  }

  return NextResponse.next();
}

export const config = { 
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
    ]
}