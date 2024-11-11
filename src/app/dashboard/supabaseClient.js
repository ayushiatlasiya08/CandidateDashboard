// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etqyjwwqhxdhthrtyvyf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cXlqd3dxaHhkaHRocnR5dnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjY0MjcsImV4cCI6MjA0NjkwMjQyN30.hByvdpJWD01c4DTPV2QpKbzCEGPuQrCmzRQ3vWCIcG0';
export const supabase = createClient(supabaseUrl, supabaseKey);
