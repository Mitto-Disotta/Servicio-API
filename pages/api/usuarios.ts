export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json([
      { id: 1, name: "Martín" },
      { id: 2, name: "Goggins" }
    ]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
