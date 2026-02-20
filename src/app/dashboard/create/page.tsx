"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Obtener el usuario autenticado actual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      // 2. Si no hay usuario, lanzar error
      if (userError || !user) {
        throw new Error("Debes estar autenticado para crear un post");
      }

      // 3. Preparar datos del post
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const postData = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        author: formData.author,
        date: new Date().toISOString().split('T')[0],
        slug: slug,
        user_id: user.id, // Incluir el user_id del autor
      };

      // 4. Insertar el post en Supabase
      const { error: insertError } = await supabase
        .from('posts')
        .insert(postData);

      if (insertError) {
        throw new Error(`Error al guardar el post: ${insertError.message}`);
      }

      // 5. Redirigir al Home
      router.push("/");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            ← Volver al Dashboard
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight">Crear Nuevo Post</h1>
        <p className="text-muted-foreground">
          Completa el formulario para crear un nuevo post en tu blog.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Post</CardTitle>
          <CardDescription>
            Los campos marcados con * son obligatorios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Escribe un título atractivo..."
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Autor *</Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Tu nombre..."
                value={formData.author}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Extracto *</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                placeholder="Un breve resumen del post (aparecerá en la lista de posts)..."
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Escribe el contenido completo de tu post..."
                value={formData.content}
                onChange={handleChange}
                rows={12}
                required
                disabled={loading}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Guardando..." : "Guardar Post"}
              </Button>
              <Link href="/dashboard">
                <Button type="button" variant="outline" className="flex-1" disabled={loading}>
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
