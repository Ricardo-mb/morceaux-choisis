export const routes = {
  public: [
    { label: "Home", href: "/" },
    // ... other public routes
  ],
  auth: [
    { label: "Dashboard", href: "/logou" }, // Also fix typo in href
  ],
  admin: [
    { label: "Create Project", href: "/admin/dashboard/projects/create" },
    // ... other admin routes
  ]
};
