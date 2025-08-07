import { db } from '@/models/db';
import type { Project } from '@/models/types';

export const projectQueries = {
  getAll: () => db.projects.toArray(),

  getById: (id: number) => db.projects.get(id),

  create: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    return db.projects.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  update: async (id: number, data: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    return db.projects.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  delete: (id: number) => db.projects.delete(id),

  getWithTasks: async (id: number) => {
    const project = await db.projects.get(id);
    if (!project) return null;
    
    const tasks = await db.tasks
      .where('projectId')
      .equals(id)
      .toArray();
    
    return { ...project, tasks };
  }
};