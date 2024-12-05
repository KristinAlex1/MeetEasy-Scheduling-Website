"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideNavBar = () => {
  const menu = [
    {
      id: 1,
      name: "Meeting Type",
      path: "/dashboard/meeting-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Schedule Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Availability",
      path: "/dashboard/availability",
      icon: Clock,
    },
  ];

  const path = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (path) {
      setActivePath(path);
    }
  }, [path]);

  return (
    <div className="p-6 bg-gray-50 shadow-xl h-full rounded-2xl flex flex-col">
      {/* Logo Section */}
      <div className="flex justify-center mb-10">
        <Image
          src="/logo3.png"
          alt="logo"
          width={100}
          height={100}
          className="rounded-full shadow-md"
        />
      </div>

      {/* Create Meeting Button */}
      <Link href="/create-meeting">
        <Button className="flex gap-3 w-full mb-8 py-3 text-md font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md">
          <Plus className="h-5 w-5" />
          Create Meeting
        </Button>
      </Link>

      {/* Navigation Menu */}
      <div className="flex flex-col gap-4 mt-6 flex-grow">
        {menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              className={`flex items-center gap-3 w-full py-3 px-4 text-md font-medium rounded-lg text-left transition-all duration-300 ${
                activePath === item.path
                  ? "bg-blue-100 text-blue-800 shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow"
              }`}
              variant="ghost"
            >
              <item.icon
                className={`h-5 w-5 ${
                  activePath === item.path ? "text-blue-800" : "text-gray-500"
                }`}
              />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p className="mb-1 font-light">&copy; 2024 MeetEase</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default SideNavBar;
