"use client";

import { PostCard } from "@/components/PostCard";
import { RealtimePosts } from "@/components/RealtimePosts";

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

interface RealtimeCheckerProps {
  initialPosts: Post[];
}

export function RealtimeChecker({ initialPosts }: RealtimeCheckerProps) {
  // Verificar si realtime está habilitado en localStorage
  if (typeof window !== 'undefined') {
    const realtimeEnabled = localStorage.getItem('realtime-enabled') === 'true';
    
    if (realtimeEnabled) {
      return <RealtimePosts initialPosts={initialPosts} />;
    }
  }
  
  // Si no está habilitado o estamos en servidor, renderizar estático
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {initialPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
