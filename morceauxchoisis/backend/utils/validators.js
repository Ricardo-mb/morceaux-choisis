export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateUserInput = (name, email, password) => {
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || !validatePassword(password)) {
    errors.push(
      "Password must be at least 8 characters long and contain at least one letter and one number",
    );
  }

  return errors.length > 0 ? errors.join(", ") : null;
};

export const validateLoginInput = (email, password) => {
  const errors = [];

  if (!email || !validateEmail(email)) {
    errors.push("Please provide a valid email address");
  }

  if (!password || password.trim().length === 0) {
    errors.push("Password is required");
  }

  return errors.length > 0 ? errors.join(", ") : null;
};
