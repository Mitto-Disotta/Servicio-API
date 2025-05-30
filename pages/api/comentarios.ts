import type { NextApiRequest, NextApiResponse } from 'next';

const comentarios = [
  { id: 1, comentario: "Aprendiendo Axios", usuario: "Martín" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return res.status(200).json(comentarios);
  }

  if (req.method === 'POST') {
    const { comentario, usuario } = req.body;
    const nuevoComentario = { id: comentarios.length + 1, comentario, usuario };
    comentarios.push(nuevoComentario);
    return res.status(201).json(nuevoComentario);
  }

  return res.status(405).json({ error: 'Método no permitido' });
}