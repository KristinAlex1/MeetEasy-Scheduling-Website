"use client";

import { useUser } from "@clerk/nextjs";
import { BarChart, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

const AppLayout = ({ children }) => {
  const { isLoaded } = useUser();
  const pathname = usePathname();

  // Debugging logs to verify the `pathname` and `isLoaded`
  console.log("isLoaded:", isLoaded);
  console.log("pathname:", pathname);

  if (!isLoaded) {
    // Show loader until user data is loaded
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col h-screen bg-blue-50 md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg ${
                    pathname === item.href
                      ? "bg-blue-100 font-bold text-blue-700"
                      : ""
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header>
          <h2 className="text=5xl md:text-6xl gradient-title pt-2 md:pt-0 text center md:text-left w-full">
            {navItems.find((item) => item.href === pathname).label ||
              "Dashboard"}
          </h2>
        </header>
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center py-2 px-4 ${
                  pathname === item.href
                    ? " text-blue-600"
                    : " text-gray-600"
                }`}
              >
                <item.icon className="w-5 h-5"/>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AppLayout;
