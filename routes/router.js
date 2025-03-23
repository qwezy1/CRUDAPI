import express from 'express';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../models/task.js';

const router = express.Router();

// Создание задачи
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;

    // Проверка на наличие всех полей
    if (!title || !description || !status || !userId) {
      return res.status(400).json({ message: 'Все поля (title, description, status, userId) обязательны' });
    }

    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: 'userId должен быть числом' });
    }

    const newTask = await createTask(req.prisma, title, description, status, parsedUserId);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

// Получение всех задач
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getAllTasks(req.prisma);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

// Получение задачи по ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await getTaskById(req.prisma, req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

// Обновление задачи
router.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: 'Введите заголовок' });
    }

    if (status !== "todo" && status !== "done") {
      return res.status(400).json({ message: 'Статус должен быть "todo" или "done"' });
    }

    const updatedTask = await updateTask(req.prisma, req.params.id, title, description, status);
    if (!updatedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

// Удаление задачи
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await deleteTask(req.prisma, req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.status(200).json({ message: 'Задача удалена' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

export default router;