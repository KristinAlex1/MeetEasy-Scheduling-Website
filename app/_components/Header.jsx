"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect, useState } from "react";
import DarkMode from "@/components/ui/DarkMode/DarkMode";

function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the links render on the client side
  }, []);

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-8 md:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo3.png"
            alt="Logo"
            width={160}
            height={160}
            className="w-[160px] h-auto"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-semibold text-gray-900">
          <a
            href="/product"
            className="hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Product
          </a>
          <a
            href="#contact"
            className="hover:text-blue-600 transition duration-300 ease-in-out"
          >
            Contact Us
          </a>
          <a
            href="#about"
            className="hover:text-blue-600 transition duration-300 ease-in-out"
          >
            About Us
          </a>
        </nav>

        {/* Authentication Buttons */}
        <div className="flex items-center gap-5">
          {isClient && (
            <>
              <LoginLink>
                <Button variant="ghost" className="px-6 py-3 text-blue-600 hover:bg-blue-100">
                  Login
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
                  Get Started
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-blue-600 text-white py-4 text-center">
        <nav className="space-x-6">
          <a href="#product" className="hover:underline">
            Product
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
