'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Key, Server, CheckCircle2 } from 'lucide-react';

export default function SetupPage() {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, key }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save configuration');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-900 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-indigo-500" />
            </div>
            <CardTitle className="text-2xl text-white">System Setup</CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Configure your Supabase connection for the Account-less Pipeline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Configuration Saved!</h3>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-left">
                <p className="text-sm text-yellow-500 font-medium mb-1">Action Required:</p>
                <p className="text-sm text-yellow-400/80">
                  Please restart your Docker container or Node server to apply these environment variables.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm rounded-md">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Supabase URL
                </label>
                <Input 
                  placeholder="https://xyz.supabase.co" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-slate-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Key className="w-4 h-4" /> Supabase Anon Key
                </label>
                <Input 
                  type="password"
                  placeholder="eyJ..." 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-slate-200"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={saving || !url || !key}
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
