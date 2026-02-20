"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center">
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
          
          {user ? (
            <>
              <Link href="/dashboard">
                <Button 
                  variant={pathname.startsWith("/dashboard") ? "default" : "ghost"}
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="font-medium"
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button 
                variant={pathname === "/login" ? "default" : "default"}
                className="font-medium"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
