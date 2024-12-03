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
    {
      id: 4,
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const path = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    if (path) {
      setActivePath(path); // Update active path based on the current route
    }
  }, [path]);

  return (
    <div className="p-6 bg-white shadow-md h-full rounded-lg">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Image
          src="/logo3.png"
          alt="logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </div>

      {/* Create Button */}
      <Link href="/create-meeting">
        <Button className="flex gap-3 w-full mb-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">
          <Plus className="h-5 w-5" />
          Create Meeting
        </Button>
      </Link>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-left transition-all duration-200 ${
                activePath === item.path
                  ? "bg-blue-100 text-blue-700 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              variant="ghost"
            >
              <item.icon
                className={`h-5 w-5 ${
                  activePath === item.path ? "text-blue-700" : "text-gray-500"
                }`}
              />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
