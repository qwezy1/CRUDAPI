import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/router.js'; // Путь должен включать .js
import dotenv from 'dotenv';
import path from 'path';

// Для работы с ES-модулями нам нужно использовать import.meta.url
import { fileURLToPath } from 'url';

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Убедись, что порт 5000

// Подключение к MongoDB
const mongoURI = process.env.DATABASE;
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Для работы с JSON
app.use(bodyParser.json());

// Обслуживание статичных файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Используем маршруты из router.js
app.use(routes);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
