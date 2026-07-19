'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Save, Download, Server, Database, CreditCard, Layout, Cpu, HardDrive, Plus, Trash2 } from 'lucide-react';

interface Node {
  id: string;
  type: string;
  name: string;
  description: string;
  status: string;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  payment: CreditCard,
  cache: Cpu,
  ai: Wand2,
  storage: HardDrive,
};

const TYPE_COLORS: Record<string, string> = {
  frontend: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  backend: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  database: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  payment: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  cache: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  ai: 'text-pink-400 bg-pink-400/10 border-pink-400/30',
  storage: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30',
};

export default function WorkspacePage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aetros_infrastructure');
    if (saved) {
      try {
        setNodes(JSON.parse(saved));
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  const saveToLocal = () => {
    localStorage.setItem('aetros_infrastructure', JSON.stringify(nodes));
    alert('Infrastructure saved successfully!');
  };

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ version: "1.0", nodes }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "infrastructure.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      if (data.result && Array.isArray(data.result)) {
        setNodes(data.result);
        localStorage.setItem('aetros_infrastructure', JSON.stringify(data.result));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const addManualNode = (type: string, name: string, desc: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      description: desc,
      status: 'active'
    };
    setNodes(prev => [...prev, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Infrastructure Configurator</h1>
            <p className="text-slate-400 mt-1">Design and save your SaaS architecture.</p>
          </div>
          {nodes.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={saveToLocal} variant="outline" className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white">
                <Save className="w-4 h-4 mr-2" /> Save State
              </Button>
              <Button onClick={exportJson} variant="outline" className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white">
                <Download className="w-4 h-4 mr-2" /> Export JSON
              </Button>
              <Button onClick={() => setNodes([])} variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Prompt & Toolbox */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-white">AI Generator</CardTitle>
                <CardDescription className="text-slate-400">Describe your SaaS to auto-generate the architecture.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="e.g. E-Commerce with Stripe and AI..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-slate-200 h-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={generating || !prompt}
                  className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 animate-spin" />
                      Analyzing & Building...
                    </span>
                  ) : (
                    <><Wand2 className="mr-2 h-5 w-5" /> Auto-Generate</>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Manual Toolbox</CardTitle>
                <CardDescription className="text-slate-400">Add components manually.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => addManualNode('frontend', 'Next.js Frontend', 'React App')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <Layout className="w-4 h-4 mr-2" /> Frontend
                  </Button>
                  <Button variant="outline" onClick={() => addManualNode('backend', 'Node.js API', 'Express Server')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <Server className="w-4 h-4 mr-2" /> Backend
                  </Button>
                  <Button variant="outline" onClick={() => addManualNode('database', 'PostgreSQL', 'Relational DB')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <Database className="w-4 h-4 mr-2" /> Database
                  </Button>
                  <Button variant="outline" onClick={() => addManualNode('cache', 'Redis', 'In-memory Cache')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <Cpu className="w-4 h-4 mr-2" /> Cache
                  </Button>
                  <Button variant="outline" onClick={() => addManualNode('payment', 'Stripe', 'Payment Gateway')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <CreditCard className="w-4 h-4 mr-2" /> Payment
                  </Button>
                  <Button variant="outline" onClick={() => addManualNode('storage', 'S3 Bucket', 'Object Storage')} className="bg-slate-950 border-slate-800 text-slate-300 hover:text-white justify-start">
                    <HardDrive className="w-4 h-4 mr-2" /> Storage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Canvas */}
          <Card className="lg:col-span-2 bg-[#0a0f1c] border-slate-800 min-h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
            <CardHeader className="relative z-10 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Live Architecture Canvas
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-8">
              {nodes.length === 0 ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-slate-500">
                  <Layout className="w-16 h-16 mb-4 opacity-20" />
                  <p>Canvas is empty.</p>
                  <p className="text-sm">Generate or add components manually.</p>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-6">
                  {nodes.map((node) => {
                    const Icon = TYPE_ICONS[node.type] || Server;
                    const colorClasses = TYPE_COLORS[node.type] || 'text-slate-400 bg-slate-400/10 border-slate-400/30';
                    return (
                      <div key={node.id} className="relative group animate-in fade-in zoom-in-95 duration-300">
                        <div className={`w-48 p-5 rounded-2xl border backdrop-blur-md flex flex-col items-center text-center transition-all hover:scale-105 shadow-xl ${colorClasses}`}>
                          <Icon className="w-10 h-10 mb-3" />
                          <h3 className="font-bold text-white text-sm mb-1">{node.name}</h3>
                          <p className="text-xs opacity-80">{node.description}</p>
                          <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        </div>
                        <button 
                          onClick={() => removeNode(node.id)}
                          className="absolute -top-3 -right-3 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

