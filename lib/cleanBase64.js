export function cleanBase64(dataURL) {
  const base64Part = dataURL.split(",").slice(-1)[0];
  return base64Part;
}
