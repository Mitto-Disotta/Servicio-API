"use client";
import { useEffect, useState } from "react";

type Usuario = {
  id: number;
  usuario: string;
};

type Comentario = {
  id: number;
  comentario: string;
  usuario: string;
};

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const fetchData = async () => {
    try {
      const usersRes = await fetch("/api/usuarios");
      const commentsRes = await fetch("/api/comentarios");
      const usersData = await usersRes.json();
      const commentsData = await commentsRes.json();

      setUsuarios(usersData);
      setComentarios(commentsData);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  useEffect(() => {
    fetchData(); // primera carga

    const interval = setInterval(() => {
      fetchData(); // actualizaciones cada 5 segundos
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Datos en tiempo real del API
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Usuarios */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Usuarios</h2>
            {usuarios.length > 0 ? (
              <ul className="space-y-2">
                {usuarios.map((u) => (
                  <li
                    key={u.id}
                    className="bg-indigo-50 px-4 py-2 rounded-md text-gray-700"
                  >
                    👤 {u.usuario}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No hay usuarios aún.</p>
            )}
          </section>

          {/* Comentarios */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Comentarios</h2>
            {comentarios.length > 0 ? (
              <ul className="space-y-2">
                {comentarios.map((c) => (
                  <li
                    key={c.id}
                    className="bg-green-50 px-4 py-2 rounded-md text-gray-700"
                  >
                    💬 <span className="font-medium">{c.usuario}:</span> {c.comentario}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No hay comentarios aún.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
