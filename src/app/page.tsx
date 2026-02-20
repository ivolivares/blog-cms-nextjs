import { PostCard } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";

// Define Post interface to match database schema
interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export default async function Home() {
  // Fetch posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

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
        {posts?.map((post) => (
          <PostCard key={post.id} post={post as Post} />
        ))}
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay posts</p>
        </div>
      ) : null}
    </div>
  );
}
