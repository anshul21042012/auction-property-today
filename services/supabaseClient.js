/*
 * AuctionPropertyToday - Supabase Client Configurator
 * Initializes the connection to the live Supabase project.
 */

(function() {
  const SUPABASE_URL = "https://xqhrjhvbustdwmrmikya.supabase.co";
  const SUPABASE_KEY = "sb_publishable_8clpbr15XYTD-8rd3DVQuA_B0DnrUL8";

  if (typeof supabase === 'undefined') {
    console.error("Supabase SDK is not loaded. Ensure CDN tag is added to the HTML header.");
    return;
  }

  // Initialize and expose Client globally
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  console.log("Supabase Client initialized successfully.");
})();
