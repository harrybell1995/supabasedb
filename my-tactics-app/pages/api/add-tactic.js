import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { tactic_name, description, formation, owner } = req.body;

      // Validate input
      if (!tactic_name || !description || !formation || !owner) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Insert data into Supabase
      const { data, error } = await supabase
        .from('tactics')
        .insert([{ tactic_name, description, formation, owner }]);

      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ data });
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ error: 'Unexpected error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
