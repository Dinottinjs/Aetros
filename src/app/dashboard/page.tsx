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
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult(`This is the generated SaaS content for: "${prompt}".\n\nSince this is an account-less guest pipeline, this content is currently stored entirely in your local browser state.`);
    setGenerating(false);
  };

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Guest Workspace</h1>
        </div>
        
        <div className="grid gap-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">SaaS Generator</CardTitle>
              <CardDescription className="text-slate-400">Generate your content completely free, without an account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Enter your prompt here..." 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500"
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {generating ? 'Generating...' : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono text-sm whitespace-pre-wrap">
                  {result}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" className="flex-1 bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
                  <Save className="mr-2 h-4 w-4" /> Save Local
                </Button>
                <Button variant="outline" className="flex-1 bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

