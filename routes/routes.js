import express from 'express';
import Task from '../models/task.js';  // Убедитесь, что используете расширение .js для локальных файлов
const router = express.Router();

//? создание таска
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;

    const newTask = new Task({ title, description, status, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Заполните все данные' });
  }
});

//? получение всех тасков
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

//? получение через id в Mongo
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Введите верный ID' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

//? обновление задачи по  id
router.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (title.trim() === "") {
      return res.status(400).json({ message: 'Введите заголовок' });
    }

    if (status !== "todo" && status !== "done") {
      return res.status(400).json({ message: 'Выберите статус' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка' });
  }
});

//? удаление задачи по id
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Введите верный ID' });
    }
    res.status(200).json({ message: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

export default router; // Используем export default вместо module.exports
