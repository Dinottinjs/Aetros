import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Settings, Zap } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 p-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Zap className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold tracking-tighter text-white">Aetros</span>
        </Link>
        <nav className="flex md:flex-col gap-2">
          <Link href="/dashboard" className="flex-1">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-900">
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/settings" className="flex-1">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-900">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
