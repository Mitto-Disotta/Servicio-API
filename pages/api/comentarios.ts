let tasks = [
  { id: 1, title: "Aprender Axios", done: false },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(tasks);
  }

  if (req.method === 'POST') {
    const { title, done } = req.body;
    const newTask = { id: tasks.length + 1, title, done: !!done };
    tasks.push(newTask);
    return res.status(201).json(newTask);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
