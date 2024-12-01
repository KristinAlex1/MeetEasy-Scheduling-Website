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
    <div className="p-5 py-15">
      <div className="flex justify-center">
        <Image src="/logo3.png" alt="logo" width={220} height={220} />
      </div>

      <Link href="/create-meeting">
        <Button className="flex gap-2 w-full mt-7 rounded-full">
          <Plus />
          Create
        </Button>
      </Link>

      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <Button
              className={`flex gap-2 justify-start w-full rounded-full hover:bg-blue-100 ${
                activePath === item.path ? "text-primary bg-blue-100" : ""
              }`}
              variant="ghost"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
