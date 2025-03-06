type Route = { label: string; href: string };

export const ROUTES: {
  public: Route[];
  authenticated: Route[];
  admin: Route[];
  guest: Route[];
} = {
        public: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  authenticated: [
    // { label: "Dashboard", href: "/dashboard" },
    { label: "Logout", href: "/logout" },
  ],
  admin: [
    { label: "Logout", href: "/logout" },
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "Manage Projects", href: "/admin/dashboard/projects/list" },
    { label: "Create Project", href: "/admin/dashboard/projects/create" },
  ],
  guest: [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ]
} as const;

export const getAuthorizedRoutes = (isAuthenticated: boolean, isAdmin: boolean) => {
  // Admin users see all routes 
  if (isAdmin) {
    return [...ROUTES.public, ...ROUTES.admin];
  }
  
  // Regular authenticated users only see public routes
  if (isAuthenticated) {
    return [...ROUTES.public, ...ROUTES.authenticated];
  }

  // Unauthenticated users see public and guest routes
  return [...ROUTES.public, ...ROUTES.guest];
};