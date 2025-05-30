import { NextApiRequest, NextApiResponse } from "next";
import { cors } from "../../lib/cors";

let comentarios = [
  { id: 1, comentario: "Aprendiendo Axios", usuario: "Martín" },
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
      id: comentarios.length + 1,
      usuario,
      comentario,
    };
    comentarios.push(nuevo);
    return res.status(201).json(nuevo);
  }

  if (req.method === "DELETE") {
    const id = parseInt(req.query.id as string);
    comentarios = comentarios.filter((c) => c.id !== id);
    return res.status(204).end();
  }

  return res.status(405).end();
}
