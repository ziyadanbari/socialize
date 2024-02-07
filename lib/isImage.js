import imageExtensions from "image-extensions";
export function isImage(file) {
  if (!file) return false;
  const isAnImage =
    imageExtensions.includes(file.type.split("/").slice(-1)[0]) || false;
  return isAnImage;
}
