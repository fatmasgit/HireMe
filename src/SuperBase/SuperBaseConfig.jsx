import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
    'https://qnpnyxyzhnuniokwkxnk.supabase.co', // Replace with your Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucG55eHl6aG51bmlva3dreG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNjc5NTYsImV4cCI6MjA0OTk0Mzk1Nn0.lxtsU1w9MmJgGFPSYXPO3jFeYjLt9jJvrkMEUPty9oE' // Replace with your Supabase anon key
  );