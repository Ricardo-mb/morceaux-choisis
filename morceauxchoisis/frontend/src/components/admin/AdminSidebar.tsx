"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminRoutes = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Create Project",
    href: "/admin/dashboard/projects/create",
  },
  {
    label: "Manage Projects",
    href: "/admin/dashboard/projects",
  }
];

export function AdminSidebar() {
  const { isAdmin } = useAuth();
  const pathname = usePathname();

  if (!isAdmin) return null;

  return (
    <aside className="w-64 min-h-screen bg-gray-800 p-6">
      <nav className="space-y-2">
        {adminRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`block px-4 py-2 rounded-md text-white hover:bg-gray-700 ${
              pathname === route.href ? "bg-pink-500" : ""
            }`}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
