
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdejqdjpocyoxybyolkt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZWpxZGpwb2N5b3h5YnlvbGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwODY0NDksImV4cCI6MjA2MDY2MjQ0OX0.5z24I9ZzpV4Aeq4AaMtwBq5IfQ8vATswxRnD-CEJ198';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
