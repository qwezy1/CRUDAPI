# Task Management API

API для управления задачами с использованием Express и Prisma.

## Установка

1. Клонируйте репозиторий:


2. Перейдите в папку проекта и установите зависимости:

    ```bash
    npm install
    ```

3. Скопируйте файл `.env.example` в `.env` и настройте переменные окружения


4. Запустите сервер:

    ```bash
    node server.js
    ```

adress: `http://localhost:<PORT>/tasks/`

---

## API Эндпоинты

- **GET** `/tasks` — Получить все задачи.
- **POST** `/tasks` — Создать новую задачу.
    Пример тела запроса:
    ```json
   {
    "title": "your title",
    "description": "qwe",
    "status": "done",
    "userId": 2
    }   
    ```

- **GET** `/tasks/:id` — Получить задачу по ID.
- **PUT** `/tasks/:id` — Обновить задачу по ID.
    Пример тела запроса:
    ```json
    {
    "title": "your title",
    "description": "qwe",
    "status": "todo",
    "userId": 2
    }  
    ```

- **DELETE** `/tasks/:id` — Удалить задачу по ID.



