export function friendlyAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "Wrong email or password. Please try again.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email first, then log in.";
  }
  if (lower.includes("user already registered")) {
    return "An account with this email already exists. Try logging in.";
  }
  if (lower.includes("password")) {
    return "Password must be at least 6 characters.";
  }
  return message;
}

export function friendlyDbError(message: string): string {
  if (message.includes("JWT")) {
    return "Your session expired. Please log in again.";
  }
  return message || "Something went wrong. Please try again.";
}
