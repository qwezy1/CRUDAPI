Usage:

In console "npm install"
Create your PORT and database
After "node server.js"

http://localhost:PORT/tasks/
http://localhost:5000/tasks-page



Postman:

GET http://localhost:PORT/tasks

POST http://localhost:PORT/tasks
{
        "_id": "",
        "title": "your title",
        "description": "",
        "status": "todo or done",
        "__v": 1
    }

GET ID http://localhost:PORT/tasks/your task ID

PUT http://localhost:PORT/tasks/your task ID
{
        "_id": "",
        "title": "your title",
        "description": "",
        "status": "todo or done",
        "__v": 1
    }

DELETE http://localhost:PORT/tasks/your task ID