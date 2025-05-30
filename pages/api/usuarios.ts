import type { NextApiRequest, NextApiResponse } from 'next';

const usuarios = [
  { id: 1, usuario: "Martín" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json(usuarios);
  }

  if (req.method === 'POST') {
    const { usuario } = req.body;
    const nuevoUsuario = { id: usuarios.length + 1, usuario };
    usuarios.push(nuevoUsuario);
    return res.status(201).json(nuevoUsuario);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
