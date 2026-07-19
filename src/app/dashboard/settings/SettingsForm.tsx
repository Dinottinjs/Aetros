'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ initialProfile }: { initialProfile: any }) {
  const [fullName, setFullName] = useState(initialProfile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(initialProfile?.avatar_url || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    let authUpdateError = null;

    if (newPassword.trim().length > 0) {
      const { error: pwdError } = await supabase.auth.updateUser({ password: newPassword });
      if (pwdError) authUpdateError = pwdError.message;
    }

    if (authUpdateError) {
      setError(authUpdateError);
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        avatar_url: avatarUrl,
        requires_password_change: false, // Clear the flag
      })
      .eq('id', user.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Settings saved successfully!');
      setNewPassword('');
      router.refresh();
      // Also redirect them to dashboard if they were forced here
      if (initialProfile?.requires_password_change && newPassword) {
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {initialProfile?.requires_password_change && (
        <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-lg text-orange-200">
          <strong>Security Notice:</strong> Please set a new password to secure your account before continuing.
        </div>
      )}

      <Card className="bg-slate-900 border-slate-800 shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-500">
        <CardHeader>
          <CardTitle className="text-xl text-white">Profile Information</CardTitle>
          <CardDescription className="text-slate-400">Update your account details and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
            <Input 
              id="fullName" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Maximilian Holzer"
              className="bg-slate-950 border-slate-800 text-slate-100 transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl" className="text-slate-300">Avatar URL</Label>
            <Input 
              id="avatarUrl" 
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.png"
              className="bg-slate-950 border-slate-800 text-slate-100 transition-all focus:border-indigo-500"
            />
          </div>
          
          <div className="pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-300">New Password (optional)</Label>
              <Input 
                id="newPassword" 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="bg-slate-950 border-slate-800 text-slate-100 transition-all focus:border-indigo-500"
              />
            </div>
          </div>

          {message && <p className="text-sm font-medium text-emerald-500 animate-in fade-in">{message}</p>}
          {error && <p className="text-sm font-medium text-red-500 animate-in fade-in">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
