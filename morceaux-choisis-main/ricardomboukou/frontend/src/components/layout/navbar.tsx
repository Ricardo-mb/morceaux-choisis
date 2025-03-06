"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES, getAuthorizedRoutes } from "@/config/routes";

export function Navbar() {
  const router = useRouter(); 
  const { isAuthenticated, isAdmin } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    //Redirect non-admin users attempting to access admin routes
    if (!isAdmin && pathname && pathname.startsWith("/admin")) {
      router.push("/");
    }
  }, [isAdmin, pathname, router]);

 const routes = getAuthorizedRoutes(isAuthenticated, isAdmin) ;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className='container mx-auto'>
        <div className='flex h-16 items-center justify-between px-4'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href='/' className='flex items-center gap-2'>
              <Logo />
            </Link>
          </motion.div>
          {/* Desktop Navigation */}
          <nav className='hidden md:block'>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='flex items-center space-x-6'
            >
             {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "nav-link",
              pathname === route.href && "nav-link-active text-primary"
            )}
          >
            {route.label}
          </Link>
        ))}
        {isAdmin && (
          <Link href="/admin/dashboard" className="nav-link">
            Admin Dashboard
          </Link>
        )}
              <ModeToggle />
            </motion.div>
          </nav>
          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='md:hidden'
          >
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsOpen(!isOpen)}
              className='relative h-10 w-10'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className='h-5 w-5' />
                  ) : (
                    <Menu className='h-5 w-5' />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='border-t md:hidden'
            >
              <div className='flex flex-col space-y-3 p-4'>
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "nav-link text-lg",
                      pathname === route.href && "text-primary"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link 
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "nav-link text-lg",
                      pathname === "/admin/dashboard" && "text-primary"
                    )}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <div className='pt-2'>
                  <ModeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}