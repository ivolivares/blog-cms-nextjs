import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Fetch post from Supabase
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Volver al blog
          </Button>
        </Link>
        
        <Card>
          <CardHeader className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>Por {post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={`paragraph-${index}`} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <Link href="/">
          <Button>
            ← Volver a todos los posts
          </Button>
        </Link>
      </div>
    </div>
  );
}
