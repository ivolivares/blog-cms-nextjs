"use client";

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  
  const { signIn, signUp, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push(redirectTo)
    }
  }, [user, router, redirectTo])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      router.push(redirectTo)
    }
    
    setLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setMessage('¡Registro exitoso! Por favor revisa tu email para confirmar tu cuenta.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Blog CMS Login
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            {message && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                {message}
              </div>
            )}

            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSignUp}
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </Button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-600">
            <Link href="/" className="hover:underline">
              ← Volver al blog
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
