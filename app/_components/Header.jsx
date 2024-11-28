"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between p-5 shadow-lg">
        <Image
          src="/logo3.png" // Make sure this image exists in the public folder
          alt="logo"
          width={100}
          height={100}
          className="w-[180px] md:w-[180px]"
        />
        <ul className="hidden md:flex gap-14 font-medium text-lg">
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Product
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Pricing
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Contact Us
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            About Us
          </li>
        </ul>
        <div className="flex gap-5">
          <LoginLink>
            <Button variant="ghost">Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
