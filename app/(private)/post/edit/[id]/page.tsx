import PostPage from "@/components/post-page";

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <PostPage postId={id} editPage={true} />
    </>
  );
};

export default Post;
