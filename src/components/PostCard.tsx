import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/lib/mockData";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          Por {post.author} • {new Date(post.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <Link 
          href={`/blog/${post.slug}`}
          className="text-primary hover:underline font-medium"
        >
          Leer más →
        </Link>
      </CardContent>
    </Card>
  );
}
