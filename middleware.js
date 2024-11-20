import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // Import NextResponse for handling responses

// Define the routes that should be protected
const isProtectedRoute = createRouteMatcher([
  "/main/dashboard(.*)",
  "/main/events(.*)",
  "/main/meetings(.*)",
  "/main/availability(.*)",
]);

export default clerkMiddleware({
  beforeAuth(auth, req) {
    console.log("Request URL:", req.url);
    console.log("Auth Details Before:", auth);
  },
  afterAuth(auth, req) {
    console.log("Auth Details After:", auth);

    if (!auth.userId && isProtectedRoute(req.nextUrl.pathname)) {
      console.error("Unauthorized access attempt to protected route:", req.nextUrl.pathname);
      // Redirect unauthenticated users to the sign-in page
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If the user is authenticated, let the request proceed
    return NextResponse.next();
  },
  onError(err, req) {
    console.error("Middleware Error:", err.message);
    return NextResponse.json(
      { error: "Middleware authentication error", message: err.message },
      { status: 500 }
    );
  },
});

export const config = {
  matcher: [
    // Protect application and API routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
