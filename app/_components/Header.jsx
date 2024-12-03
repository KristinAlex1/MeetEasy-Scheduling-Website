"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect, useState } from "react";

function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the links render on the client side
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-5 px-6 md:px-10">
        {/* Logo */}
        <Image
          src="/logo3.png"
          alt="logo"
          width={150}
          height={150}
          className="w-[150px] h-auto"
        />

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium">
          <a
            href="#product"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Product
          </a>
          <a
            href="#pricing"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="#about"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
          >
            About Us
          </a>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex gap-4">
          {isClient && (
            <>
              <LoginLink>
                <Button variant="ghost" className="px-5 py-2 text-blue-600 hover:bg-blue-100">
                  Login
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="block md:hidden bg-blue-600 text-white py-3 text-center font-medium text-lg">
        <nav className="flex justify-around">
          <a href="#product" className="hover:underline">
            Product
          </a>
          <a href="#pricing" className="hover:underline">
            Pricing
          </a>
          <a href="#contact" className="hover:underline">
            Contact Us
          </a>
          <a href="#about" className="hover:underline">
            About Us
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
