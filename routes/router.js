import express from 'express';
import Task from '../models/task.js'; // Убедитесь, что используете расширение .js для локальных файлов - убери эту хуйню гптшную, и не вставляй больше эти комменты
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Для получения пути к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отдача HTML страницы
router.get('/tasks-page', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'tasks.html'));
});

//? создание таска
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, userId } = req.body; // где проверка на данные, которые ввел пользователь?
    // почему тут юзер айди должен вводить пользователь? убери это

    const newTask = new Task({ title, description, status, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Заполните все данные' }); // какие данные? ошибки надо расписывать подробно
  }
});

//? получение всех тасков
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // чьих тасков? всех пользователей сразу получается
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'error' }); // тоже самое
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
    res.status(500).json({ message: 'error' }); // тоже самое
  }
});

//? обновление задачи по  id
router.put('/tasks/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body; // айдишник юзера тут уже не нужен?)

    if (title.trim() === "") {
      return res.status(400).json({ message: 'Введите заголовок' });
    }

    if (status !== "todo" && status !== "done") {
      return res.status(400).json({ message: 'Выберите статус' }); // если я например цифру буду вводить в описание, проверки нет
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
    res.status(500).json({ message: 'Ошибка' }); // какая блять ошибка?
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
    res.status(500).json({ message: 'error' }); // 🖕
  }
});

export default router;
