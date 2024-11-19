export const validateEmail = (email: string): boolean => {
  // Test the email against the regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}