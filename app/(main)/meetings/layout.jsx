"use client";

import { useUser } from "@clerk/nextjs";
import { BarChart, Calendar, Clock, Users } from "lucide-react";
import Link from "next/link";
import { BarLoader } from "react-spinners";


const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/meetings", label: "Meetings", icon: Users },
    { href: "/availability", label: "Availability", icon: Clock },
];

const AppLayout = ({ children }) => {
    const { isLoaded } = useUser();

    return (
        <>
            {!isLoaded && <BarLoader width={"100%"} color ="#36d7b7" />}
            <div>
                <aside>
                    <nav>
                        <ul>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </aside>
            </div>
            {children}
        </>


    );
};

export default AppLayout; 