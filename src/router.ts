import { Router } from 'express';
import prisma from './db';

const router = Router();

type Todo = {
    complete: boolean;
    id: string;
    text: string;
};

router.get('/todos', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json({ data: todos });
});

router.get('/todos/:id', async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: { id: req.params.id },
    });

    if (!todo) {
        res.status(404).json({ error: `Todo: ${req.params.id} Not found` });
    }

    res.json({ data: todo });
});

router.patch('/todos/toggle-complete/:id', async (req, res) => {
    const todo = await prisma.todo.findUnique({
        where: { id: req.params.id },
    });

    if (!todo) {
        res.status(404).json({ error: `Todo: ${req.params.id} Not found` });
    }

    const newTodo = await prisma.todo.update({
        where: {
            id: req.params.id,
        },
        data: {
            ...todo,
            complete: !todo?.complete,
        },
    });

    res.json({ data: newTodo });
});

router.post('/todos', async (req, res) => {
    const { text }: { text: string } = req.body;
    const newTodo: Todo = { complete: false, id: String(Date.now()), text };

    await prisma.todo.create({
        data: newTodo,
    });

    res.json({ data: newTodo });
});

router.delete('/todos/:id', async (req, res) => {
    const todo = await prisma.todo.delete({
        where: { id: req.params.id },
    });

    if (!todo) {
        res.status(404).json({ error: `Todo: ${req.params.id} Not found` });
    }

    res.json({ data: todo });
});

export default router;
