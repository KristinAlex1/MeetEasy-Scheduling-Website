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

  if (!user) return null; // Early return if user is not available

  return (
    <div className="p-4 px-10">
      <div className="flex items-center float-right">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <Image
              src={user?.picture || "/default-avatar.png"} // Fallback to a default avatar if no picture is provided
              alt="User Avatar"
              width={50}
              height={50}
              className="rounded-full"
            />
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutLink>Log out</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DashboardHeader;
