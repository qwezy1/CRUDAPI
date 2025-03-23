import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});


app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));