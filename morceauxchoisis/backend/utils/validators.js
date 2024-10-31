export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUserInput = (name, email, password) => {
  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (!validateEmail(email)) {
    return "Invalid email format";
  }

  if (!validatePassword(password)) {
    return "Password must be at least 6 characters long";
  }

  return null;
};
