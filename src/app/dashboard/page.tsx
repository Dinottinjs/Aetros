import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-800 text-slate-300 hover:text-white">Back to Home</Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">Profile</CardTitle>
                <CardDescription className="text-slate-400">Your account details</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</label>
                <p className="text-slate-300 font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">User ID</label>
                <p className="text-slate-400 text-sm font-mono truncate">{user.id}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">Subscription</CardTitle>
                <CardDescription className="text-slate-400">Manage your billing</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription ? (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Status</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${subscription.status === 'active' ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                        <p className="text-slate-300 font-medium capitalize">{subscription.status}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Renews on</label>
                    <p className="text-slate-300 font-medium">
                      {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <form action="/api/stripe/portal" method="POST" className="pt-2">
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      Manage Billing
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-400 mb-4">You do not have an active subscription.</p>
                  <Link href="/#pricing">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">View Plans</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
