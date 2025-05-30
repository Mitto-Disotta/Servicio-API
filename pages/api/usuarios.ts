import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { cors } from "../../lib/cors";

let usuarios = [
  { id: uuidv4(), usuario: "Martín" },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  cors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(usuarios);
  }

  if (req.method === 'POST') {
    const { usuario } = req.body;
    const nuevoUsuario = { id: uuidv4(), usuario };
    usuarios.push(nuevoUsuario);
    return res.status(201).json(nuevoUsuario);
  }

  if (req.method === "DELETE") {
    const id = req.query.id;
    usuarios = usuarios.filter((c) => c.id !== id);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
