import { createClient } from "./lib/supabase/index"; // Assume this exists or use node-fetch

async function check() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    return;
  }

  const { data, error } = await fetch(`${supabaseUrl}/rest/v1/posts?select=*&limit=1`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  }).then(res => res.json().then(json => ({ data: json, error: res.ok ? null : json })));

  console.log("Data:", JSON.stringify(data, null, 2));
  console.log("Error:", JSON.stringify(error, null, 2));
}

check();
