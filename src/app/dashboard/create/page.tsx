"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePostPage() {
  const router = useRouter();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulación de guardado - solo console.log y alerta
    console.log("Datos del post a guardar:", {
      ...formData,
      date: new Date().toISOString().split('T')[0],
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      id: Date.now().toString()
    });
    
    alert("Guardado simulado - Los datos se han mostrado en la consola");
    
    // Redirigir al dashboard
    router.push("/dashboard");
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
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Guardar Post
              </Button>
              <Link href="/dashboard">
                <Button type="button" variant="outline" className="flex-1">
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
