"use client"

import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminGuard } from "@/components/guards/AdminGuard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}
