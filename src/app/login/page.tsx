'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Login successful! Redirecting...');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.message.includes('fetch')) {
        setError('Verbindung zur Datenbank fehlgeschlagen. Bitte prüfe deine Supabase Keys in der .env.local Datei!');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for the confirmation link.');
      }
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.message.includes('fetch')) {
        setError('Verbindung zur Datenbank fehlgeschlagen. Bitte prüfe deine Supabase Keys in der .env.local Datei!');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
        <Zap className="h-6 w-6 text-indigo-500" />
        <span className="text-xl font-bold tracking-tighter text-white">Aetros</span>
      </Link>
      
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="bg-slate-950 border-slate-800 text-slate-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input 
                id="password" 
                type="password"
                className="bg-slate-950 border-slate-800 text-slate-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {message && <p className="text-sm text-emerald-500">{message}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sign In'}
          </Button>
          <Button 
            variant="outline"
            className="w-full border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800" 
            onClick={handleSignUp}
            disabled={loading}
          >
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
