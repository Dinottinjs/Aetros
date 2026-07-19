import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Simple .env.local parser
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8').split('\n');
  envConfig.forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('⚠️ HINWEIS: Bitte trage deine Supabase Keys in die .env.local Datei ein, damit der Admin-Account erstellt werden kann.');
  process.exit(0); // Exit without error to not block the launch script
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const email = 'admin@aetros.local';
  const password = 'aetros';

  console.log('🔄 Checking for existing admin account...');
  
  // Create the user
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('✅ Admin account already exists. Skipping creation.');
    } else {
      console.error('❌ Error creating admin account:', error.message);
    }
    return;
  }

  if (data.user) {
    // Check if the profile triggers worked, or force update requires_password_change
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ requires_password_change: true })
      .eq('id', data.user.id);

    if (profileError) {
      console.error('❌ Error updating admin profile:', profileError.message);
    } else {
      console.log('✅ Admin account created successfully! Email: admin@aetros.local / Password: aetros');
    }
  }
}

createAdmin();
