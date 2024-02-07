import { cleanBase64 } from "./cleanBase64";

export function isBase64(str) {
  const cleanedStr = cleanBase64(str);
  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(cleanedStr);
}
