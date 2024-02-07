export function isEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  return emailRegex.test(email);
}
