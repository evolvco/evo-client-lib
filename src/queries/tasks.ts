import { db } from '@/models/db';
import type { Task } from '@/models/types';

export const taskQueries = {
  getAllForProject: (projectId: number) => 
    db.tasks.where('projectId').equals(projectId).toArray(),

  create: async (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    return db.tasks.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  update: async (id: number, data: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    return db.tasks.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  delete: (id: number) => db.tasks.delete(id),

  updateStatus: (id: number, status: Task['status']) => 
    db.tasks.update(id, { 
      status, 
      updatedAt: new Date() 
    }),

  getDueSoon: () => 
    db.tasks
      .where('status')
      .notEqual('done')
      .filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const diff = dueDate.getTime() - today.getTime();
        const days = diff / (1000 * 3600 * 24);
        return days <= 7;
      })
      .toArray()  
};