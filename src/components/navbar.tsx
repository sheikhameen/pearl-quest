"use client";

import { ScrollText, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const routes = [
  // { label: "Home", href: "/", icon: <House /> },
  { label: "Sets", href: "/sets", icon: <ScrollText /> },
  { label: "Settings", href: "/settings", icon: <Settings /> },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 p-2 w-full md:p-4">
      <div className="container mx-auto bg-white shadow-2xl rounded-full py-4 px-8 flex justify-between md:w-max md:gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              buttonVariants({
                size: "icon",
                variant: pathname === route.href ? "default" : "secondary",
              }),
              "rounded-full [&_svg]:size-6 p-6"
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
