export function extractFileTypeFromBase64(base64String) {
  const prefixIndex = base64String.indexOf(";base64,");
  if (prefixIndex !== -1) {
    const mimeType = base64String.substring(5, prefixIndex);
    const type = mimeType.split("/")[0];
    return { mimeType, type };
  }
  return null;
}
