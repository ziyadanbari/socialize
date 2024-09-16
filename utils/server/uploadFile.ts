import { put } from "@vercel/blob";

interface Props {
  base64: string;
  fileName: string;
}

export async function uploadFile(file: Props) {
  try {
    // eslint-disable-next-line prefer-const
    let { fileName, base64 } = file;
    const fileBuffer = Buffer.from(base64, "base64");
    const blob = await put(fileName, fileBuffer, {
      access: "public",
    });
    return { uploaded: true, blob };
  } catch (error) {
    return { uploaded: false };
  }
}
