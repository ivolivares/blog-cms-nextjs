"use client";

import { useEffect, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { supabase } from "@/lib/supabase";

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

interface RealtimePostsProps {
  initialPosts: Post[];
}

export function RealtimePosts({ initialPosts }: RealtimePostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    // Suscribirse a cambios en tiempo real en la tabla posts
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          // Cuando se inserta un nuevo post, agregarlo al estado local
          const newPost = payload.new as Post;
          setPosts(currentPosts => [newPost, ...currentPosts]);
        }
      )
      .subscribe();

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
