

const createTask = async (prisma, title, description, status, userId) => {
  return await prisma.task.create({  //?создает задчу через призму
    data: {
      title,
      description,
      status,
      userId,
    },
  });
};

const getAllTasks = async (prisma) => {  //?Метод Prisma, который возвращает все записи из таблицы task. Без аргументов он просто берет все задачи.
  return await prisma.task.findMany();
};

const getTaskById = async (prisma, id) => { //?поиск по айди
  return await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
};

const updateTask = async (prisma, id, title, description, status) => { //?обновление 
  return await prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      status,
    },
  });
};

const deleteTask = async (prisma, id) => {
  return await prisma.task.delete({
    where: { id: parseInt(id) },
  });
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };