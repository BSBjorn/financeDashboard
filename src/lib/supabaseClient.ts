import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://yymugfwlbrbgnlbnysit.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bXVnZndsYnJiZ25sYm55c2l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYzNzYyMTEsImV4cCI6MTk4MTk1MjIxMX0.s5tdFqpJsz9HseFZznGVs4be6fTxiyHY4dryeKEngbs"
);
//export const supabase = createClient(
//  import.meta.env.SUPABASE_URL,
//  import.meta.env.SUPABASE_KEY
//);
