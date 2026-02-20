"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="font-bold text-xl">
          Blog CMS
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/">
            <Button 
              variant={pathname === "/" ? "default" : "ghost"}
              className="font-medium"
            >
              Home
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button 
              variant={pathname.startsWith("/dashboard") ? "default" : "ghost"}
              className="font-medium"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
