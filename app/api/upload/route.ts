import { uploadPost } from "@/actions/uploadPost";

export async function POST(req: Request) {
  const body = await req.json();
  const response = await uploadPost(body);
  return Response.json(response);
}
