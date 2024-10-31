export const PORT = process.env.PORT || 5000;

// MongoDB
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/graphql-basics";

// Project Status
export const PROJECT_STATUS = {
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
  CANCELLED: "Cancelled",
};

// User Roles
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Sort Options
export const SORT_OPTIONS = {
  CREATED_ASC: "createdAt_asc",
  CREATED_DESC: "createdAt_desc",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc",
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  USER_NOT_FOUND: "User not found",
  PROJECT_NOT_FOUND: "Project not found",
  UNAUTHORIZED: "Unauthorized access",
  VALIDATION_ERROR: "Validation error",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: "Project created successfully",
  PROJECT_UPDATED: "Project updated successfully",
  PROJECT_DELETED: "Project deleted successfully",
};
