import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vfdhpfffmqzernvzkemv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZGhwZmZmbXF6ZXJudnprZW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NTEyMzYsImV4cCI6MjA2MTUyNzIzNn0.V0sYSbS3u_QfyzdefoUks3J-gR6dnh5mEMBGndO5AcM";

export const supabase = createClient(supabaseUrl, supabaseKey)
