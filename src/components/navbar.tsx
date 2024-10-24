"use client";

import { House, ScrollText, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Home", href: "/", icon: <House /> },
  { label: "Sets", href: "/sets", icon: <ScrollText /> },
  { label: "Settings", href: "/settings", icon: <Settings /> },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full p-2">
      <div className="container mx-auto bg-white shadow-2xl rounded-full py-4 px-8 flex justify-between">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              buttonVariants({
                size: "icon",
                variant: pathname === route.href ? "default" : "secondary",
              }),
              "rounded-full"
            )}
          >
            {route.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;