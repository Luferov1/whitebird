import PostDetailsPage from '@/src/components/posts/PostDetailsPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <PostDetailsPage postId={Number(id)} />;
}
