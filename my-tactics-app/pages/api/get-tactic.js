import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const { data, error } = await supabase
      .from('tactics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
