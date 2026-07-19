import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Heuristic AI generation
    const lowerPrompt = prompt.toLowerCase();
    let nodes: any[] = [];

    // Basic common nodes for all SaaS
    nodes.push({ id: 'frontend-1', type: 'frontend', name: 'Next.js App', description: 'React Server Components', status: 'active' });

    if (lowerPrompt.includes('database') || lowerPrompt.includes('supabase') || lowerPrompt.includes('saas')) {
      nodes.push({ id: 'db-1', type: 'database', name: 'Supabase DB', description: 'PostgreSQL Relational DB', status: 'active' });
    }

    if (lowerPrompt.includes('stripe') || lowerPrompt.includes('payment') || lowerPrompt.includes('saas') || lowerPrompt.includes('ecommerce') || lowerPrompt.includes('shop')) {
      nodes.push({ id: 'payment-1', type: 'payment', name: 'Stripe Gateway', description: 'Checkout & Webhooks', status: 'active' });
    }

    if (lowerPrompt.includes('cache') || lowerPrompt.includes('redis') || lowerPrompt.includes('fast') || lowerPrompt.includes('scale')) {
      nodes.push({ id: 'cache-1', type: 'cache', name: 'Redis Cache', description: 'Upstash Serverless Redis', status: 'active' });
    }

    if (lowerPrompt.includes('ai') || lowerPrompt.includes('llm') || lowerPrompt.includes('openai') || lowerPrompt.includes('generator')) {
      nodes.push({ id: 'ai-1', type: 'ai', name: 'AI Worker', description: 'OpenAI API Integration', status: 'active' });
    }

    if (lowerPrompt.includes('storage') || lowerPrompt.includes('image') || lowerPrompt.includes('upload')) {
      nodes.push({ id: 'storage-1', type: 'storage', name: 'S3 Storage', description: 'AWS S3 / Supabase Storage', status: 'active' });
    }
    
    // Fallback if prompt is very small or weird
    if (nodes.length === 1) {
      nodes.push({ id: 'backend-1', type: 'backend', name: 'Node.js API', description: 'Express/Next API Routes', status: 'active' });
    }

    // Simulate network delay to make it feel like AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json({ result: nodes });
  } catch (err: any) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
