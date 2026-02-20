import { getAllPosts } from "@/lib/mockData";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Bienvenido a mi Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubre artículos sobre desarrollo web, tecnología y mejores prácticas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay posts disponibles.</p>
        </div>
      )}
    </div>
  );
}
