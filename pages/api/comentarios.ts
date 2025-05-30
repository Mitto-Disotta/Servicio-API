import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import { cors } from "../../lib/cors";

let comentarios = [
  { id: uuidv4(), comentario: "Aprendiendo Axios", usuario: "Martín" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(comentarios);
  }

  if (req.method === "POST") {
    const { usuario, comentario } = req.body;
    const nuevo = {
      id: uuidv4(),
      usuario,
      comentario,
    };
    comentarios.push(nuevo);
    return res.status(201).json(nuevo);
  }

  if (req.method === "DELETE") {
    const id = req.query.id;
    comentarios = comentarios.filter((c) => c.id !== id);
    return res.status(204).end();
  }

  return res.status(405).end();
}
