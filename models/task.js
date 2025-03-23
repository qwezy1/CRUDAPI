import mongoose from 'mongoose';

//? создание модели для тасков
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, // названия не уникальные, у 2х юзеров могут быть одинаковые названия, твоему апи пизда.
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'done'],
    default: 'todo'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // где схема пользователя?
    ref: 'User'
  }
});

export default mongoose.model('Task', TaskSchema); 
