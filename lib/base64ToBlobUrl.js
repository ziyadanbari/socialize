import { cleanBase64 } from "./cleanBase64";

export function base64ToBlobUrl(base64String, mimeType = "image/png") {
  base64String = cleanBase64(base64String);
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });

  const blobUrl = URL.createObjectURL(blob);

  return blobUrl;
}
