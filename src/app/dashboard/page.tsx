'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wand2, Save, Download } from 'lucide-react';

export default function WorkspacePage() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');

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
      
      if (data.result) {
        setResult(data.result);
      } else {
        setResult('<div class="text-red-500 p-4">Generation failed.</div>');
      }
    } catch (err) {
      setResult('<div class="text-red-500 p-4">Network error during generation.</div>');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Guest Workspace</h1>
        </div>
        
        <div className="grid gap-6">
          <Card className="bg-slate-900 border-slate-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">AI SaaS Generator</CardTitle>
              <CardDescription className="text-slate-400">Describe the UI component or page you want to generate. Try "dashboard" or "landing page".</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="E.g., build a modern analytics dashboard..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 h-12 text-lg px-4"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
              >
                {generating ? (
                  <span className="flex items-center gap-2 animate-pulse">
                    <Wand2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating your component...
                  </span>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate UI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-900 border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
              <CardHeader className="bg-slate-800/50 border-b border-slate-800">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Generated Output
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  className="p-8 bg-slate-950 min-h-[300px] flex flex-col justify-center"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              </CardContent>
              <CardFooter className="gap-2 bg-slate-800/30 border-t border-slate-800 pt-6">
                <Button variant="outline" className="flex-1 bg-slate-950 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                  <Save className="mr-2 h-4 w-4" /> Save to LocalStorage
                </Button>
                <Button variant="outline" className="flex-1 bg-slate-950 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                  <Download className="mr-2 h-4 w-4" /> Export Code
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

