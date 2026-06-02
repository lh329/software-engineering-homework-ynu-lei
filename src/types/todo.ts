export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export type SortBy = 'createdAt' | 'updatedAt' | 'priority' | 'title';

export type SortOrder = 'asc' | 'desc';

export interface TodoFilters {
  status: FilterStatus;
  priority: string;
  category: string;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface TodoStore {
  todos: Todo[];
  filters: TodoFilters;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilters: (filters: Partial<TodoFilters>) => void;
  clearCompleted: () => void;
  getFilteredTodos: () => Todo[];
  importTodos: (todos: Todo[]) => void;
  exportTodos: () => string;
}