import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Todo API is running!');
});
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
    },
  });
  res.json(todo);
});
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });
  res.json(todo);
});
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      completed,
    },
  });
  res.json(todo);
});
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});