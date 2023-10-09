import prisma from "../../libs/prisma";
import Posts from "@/components/posts";
import Link from "next/link";

const getPosts = async () => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return posts
}
export default async function Home() {
    const posts = await getPosts();
  return (
    <main className="grid place-items-center place-content-center space-y-8 min-h-screen">
      <h1>Posts</h1>
        <Link href={"/add-posts"}>Add a New Post</Link>
        {
            posts.map(post => (
                <Posts key={post.id} id={post.id} title={post.title} content={post.content} authorName={post.author?.name} />
            ))
        }
    </main>
  )
}
