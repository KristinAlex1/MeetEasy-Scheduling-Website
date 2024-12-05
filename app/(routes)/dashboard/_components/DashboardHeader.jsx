"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DashboardHeader() {
  const { user } = useKindeBrowserClient();

  // Return a placeholder if the user is not logged in
  if (!user) {
    return (
      <div className="p-4 px-10 flex justify-end">
        <span className="text-sm text-gray-500">Not logged in</span>
      </div>
    );
  }

  return (
    <header className="bg-gray-100 border-b p-5 px-8">
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Image
              src={user?.picture || "/default-avatar.png"} // Default avatar if no picture is provided
              alt="User Avatar"
              width={40} // Reduced size for a cleaner look
              height={40}
              className="rounded-full border border-gray-300"
            />
            <span className="font-medium text-gray-700 text-sm">
              {user?.name || "Guest"} {/* Display name or 'Guest' */}
            </span>
            <ChevronDown className="text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border">
            <DropdownMenuLabel className="text-gray-700">Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem>
              <span className="text-sm text-gray-600">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-sm text-gray-600">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-sm text-gray-600">Subscription</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem>
              <LogoutLink className="text-sm text-red-600 hover:underline">Log out</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default DashboardHeader;
