export const validatePassword = (password: string): boolean => {
  // Test the password against the regular expression
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
  return passwordRegex.test(password);
}