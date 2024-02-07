export function cleanObject(obj) {
  const cleanedObject = {};

  for (const key in obj) {
    if (obj[key]) {
      cleanedObject[key] = obj[key];
    }
  }

  return cleanedObject;
}
