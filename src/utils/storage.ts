import type { Todo } from '../types/todo';

const STORAGE_KEY = 'ai-resume-todos';

export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};

export const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load todos:', error);
  }
  return getDefaultTodos();
};

export const exportTodos = (todos: Todo[]): string => {
  return JSON.stringify(todos, null, 2);
};

export const importTodos = (jsonString: string): Todo[] => {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    throw new Error('Invalid todo data format');
  } catch (error) {
    console.error('Failed to import todos:', error);
    return [];
  }
};

export const getDefaultTodos = (): Todo[] => [
  {
    id: '1',
    title: '完成项目文档',
    description: '编写项目的README文档和API文档',
    completed: false,
    priority: 'high',
    category: '工作',
    dueDate: '2026-06-15',
    tags: ['文档', '重要'],
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-06-01T08:00:00Z',
  },
  {
    id: '2',
    title: '学习React Hooks',
    description: '深入学习useState、useEffect等Hooks的使用',
    completed: false,
    priority: 'medium',
    category: '学习',
    tags: ['React', '学习'],
    createdAt: '2026-06-01T09:00:00Z',
    updatedAt: '2026-06-01T09:00:00Z',
  },
  {
    id: '3',
    title: '整理代码结构',
    description: '优化项目的目录结构和代码组织',
    completed: true,
    priority: 'low',
    category: '工作',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-05-30T14:00:00Z',
  },
  {
    id: '4',
    title: '购买生活用品',
    description: '购买牛奶、面包、鸡蛋等日常用品',
    completed: false,
    priority: 'medium',
    category: '生活',
    dueDate: '2026-06-03',
    tags: ['购物'],
    createdAt: '2026-06-01T12:00:00Z',
    updatedAt: '2026-06-01T12:00:00Z',
  },
  {
    id: '5',
    title: '运动健身',
    description: '每周三次有氧运动，保持身体健康',
    completed: true,
    priority: 'medium',
    category: '生活',
    tags: ['健康', '运动'],
    createdAt: '2026-05-25T07:00:00Z',
    updatedAt: '2026-05-31T07:00:00Z',
  },
];

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getCategories = (todos: Todo[]): string[] => {
  const categories = new Set(todos.map((todo) => todo.category));
  return ['all', ...Array.from(categories)];
};

export const getTags = (todos: Todo[]): string[] => {
  const tags = new Set<string>();
  todos.forEach((todo) => todo.tags?.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
};