import supabase from '../supabaseClient.js';

export default async function handler(req, res) {
  res.status(200).json({ message: 'Backend running ✅' });
}
