import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'; // Make sure to import NextResponse

// Define the routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/main/dashboard(.*)",
  "/main/events(.*)",
  "/main/meetings(.*)",
  "/main/availability(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Redirect to sign-in page if the user is not authenticated
    return NextResponse.redirect(new URL('/sign-in', req.url)); // Ensure the URL is correct
  }

  // If the user is authenticated, let the request proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Ensure this matches the desired routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
