import { supabase } from '../../supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('tactics')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
