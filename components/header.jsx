import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import UserProfile from "../components/UserProfile";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  let user = null;

  try {
    user = await checkUser();
    console.log("User from checkUser in Header:", user);
  } catch (error) {
    console.error("Error in Header:", error.message || "Unknown error");
  }

  return (
    <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
      {/* Logo */}
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo3.png"
          width="150"
          height="40"
          alt="MeetEasy logo"
          className="h-16 w-auto"
        />
      </Link>

      {/* Right-side Buttons */}
      <div className="flex items-center gap-4">
        {/* Create Event Button */}
        <Link href="/events?create=true">
          <Button className="flex items-center gap-2">
            <PenBox size={18} /> Create Event
          </Button>
        </Link>

        {/* Authenticated / Unauthenticated Logic */}
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
