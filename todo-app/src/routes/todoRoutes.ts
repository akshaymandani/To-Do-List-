import express, { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

const router = express.Router();

router.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/todos', async (req: Request, res: Response) => {
  const todo: ITodo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
