import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // A simple heuristic "generator" to make it look like AI is working
    const lowerPrompt = prompt.toLowerCase();
    let generatedHtml = '';

    if (lowerPrompt.includes('dashboard')) {
      generatedHtml = `
<div class="p-6 bg-slate-900 rounded-xl border border-slate-800 w-full max-w-3xl mx-auto text-slate-100 font-sans">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-2xl font-bold text-indigo-400">Analytics Dashboard</h2>
    <button class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Export Report</button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
      <div class="text-slate-400 text-sm font-medium mb-1">Total Users</div>
      <div class="text-3xl font-bold">12,490</div>
      <div class="text-emerald-400 text-sm mt-2 flex items-center gap-1">↑ 14% this month</div>
    </div>
    <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
      <div class="text-slate-400 text-sm font-medium mb-1">Revenue</div>
      <div class="text-3xl font-bold">$45,200</div>
      <div class="text-emerald-400 text-sm mt-2 flex items-center gap-1">↑ 8% this month</div>
    </div>
    <div class="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
      <div class="text-slate-400 text-sm font-medium mb-1">Active Sessions</div>
      <div class="text-3xl font-bold">1,402</div>
      <div class="text-rose-400 text-sm mt-2 flex items-center gap-1">↓ 2% this month</div>
    </div>
  </div>
  <div class="h-48 bg-slate-800/30 rounded-lg border border-slate-700/50 flex items-center justify-center text-slate-500">
    [ Chart Visualization Placeholder ]
  </div>
</div>`;
    } else if (lowerPrompt.includes('landing') || lowerPrompt.includes('website')) {
      generatedHtml = `
<div class="w-full text-center py-16 px-4 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-xl border border-indigo-500/20 shadow-2xl">
  <div class="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-6 border border-indigo-500/30">
    New Features Available
  </div>
  <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
    Build the future, faster.
  </h1>
  <p class="text-lg text-slate-400 max-w-xl mx-auto mb-10">
    Experience the ultimate platform for modern developers. Scale your applications instantly with our next-generation tools.
  </p>
  <div class="flex justify-center gap-4">
    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
      Start Free Trial
    </button>
    <button class="bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg border border-white/10 transition-all">
      Read Documentation
    </button>
  </div>
</div>`;
    } else {
      generatedHtml = `
<div class="p-8 bg-slate-900 rounded-xl border border-slate-800 text-center">
  <div class="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
    <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
  <h3 class="text-2xl font-bold text-white mb-3">AI Generation Complete</h3>
  <p class="text-slate-400 mb-6 max-w-md mx-auto">
    We have processed your prompt: "${prompt}". Because this is a lightweight mockup, try using keywords like "dashboard" or "landing page" for richer visual outputs!
  </p>
  <button class="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-700">Acknowledge</button>
</div>`;
    }

    // Simulate network delay to make it feel like AI processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return NextResponse.json({ result: generatedHtml });
  } catch (err: any) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
