const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://xqhrjhvbustdwmrmikya.supabase.co";
const SUPABASE_KEY = "sb_publishable_8clpbr15XYTD-8rd3DVQuA_B0DnrUL8";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runDiagnostics() {
  console.log("--- Supabase Database Diagnostics ---");
  
  // 1. Check properties
  console.log("Fetching properties...");
  const { data: props, error: propsError } = await client.from('properties').select('id, title, city');
  if (propsError) {
    console.error("Error fetching properties:", propsError);
  } else {
    console.log(`Found ${props.length} properties:`);
    props.forEach(p => console.log(`  [ID: ${p.id}] ${p.title} (${p.city})`));
  }

  // 2. Check inquiries
  console.log("\nFetching inquiries...");
  const { data: inqs, error: inqsError } = await client.from('inquiries').select('*');
  if (inqsError) {
    console.error("Error fetching inquiries:", inqsError);
  } else {
    console.log(`Found ${inqs.length} inquiries:`);
    inqs.forEach(i => console.log(`  [ID: ${i.id}] Name: ${i.name}, Phone: ${i.phone}, Email: ${i.email}, Property ID: ${i.property_id}, Budget: ${i.budget}, Message: ${i.message}`));
  }
}

runDiagnostics();
