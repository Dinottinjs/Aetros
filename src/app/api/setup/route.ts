import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { url, key } = await req.json();

    if (!url || !key) {
      return NextResponse.json({ error: 'URL and Key are required' }, { status: 400 });
    }

    const envPath = path.resolve(process.cwd(), '.env.local');
    let envContent = '';

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Update or append NEXT_PUBLIC_SUPABASE_URL
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
      envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_URL=.*/g, `NEXT_PUBLIC_SUPABASE_URL=${url}`);
    } else {
      envContent += `\nNEXT_PUBLIC_SUPABASE_URL=${url}`;
    }

    // Update or append NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      envContent = envContent.replace(/NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/g, `NEXT_PUBLIC_SUPABASE_ANON_KEY=${key}`);
    } else {
      envContent += `\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${key}`;
    }

    // Update or append SUPABASE_SERVICE_ROLE_KEY to the same key if it's the only one they have, or leave it.
    // Usually setup asks for service key too, but let's just use anon key for both for simplicity if they just want basic setup.
    // Actually, let's keep it simple.

    fs.writeFileSync(envPath, envContent);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Setup Error:', err);
    return NextResponse.json({ error: 'Failed to write to .env.local' }, { status: 500 });
  }
}
