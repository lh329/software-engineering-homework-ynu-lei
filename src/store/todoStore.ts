import { create } from 'zustand';
import type { Todo, TodoStore, TodoFilters } from '../types/todo';
import { saveTodos, loadTodos, generateId, exportTodos as exportTodosUtil } from '../utils/storage';

const defaultFilters: TodoFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const useTodoStore = create<TodoStore>((set, get) => {
  const initialTodos = loadTodos();

  return {
    todos: initialTodos,
    filters: defaultFilters,

    addTodo: (todo) => {
      const newTodo: Todo = {
        ...todo,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => {
        const updatedTodos = [...state.todos, newTodo];
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    updateTodo: (id, updates) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
            : todo
        );
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    deleteTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    toggleTodo: (id) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        );
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    setFilters: (filters) => {
      set((state) => ({
        filters: { ...state.filters, ...filters },
      }));
    },

    clearCompleted: () => {
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => !todo.completed);
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    getFilteredTodos: () => {
      const { todos, filters } = get();
      let result = [...todos];

      if (filters.status !== 'all') {
        result = result.filter((todo) =>
          filters.status === 'completed' ? todo.completed : !todo.completed
        );
      }

      if (filters.priority !== 'all') {
        result = result.filter((todo) => todo.priority === filters.priority);
      }

      if (filters.category !== 'all') {
        result = result.filter((todo) => todo.category === filters.category);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
          (todo) =>
            todo.title.toLowerCase().includes(searchLower) ||
            todo.description?.toLowerCase().includes(searchLower) ||
            todo.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      result.sort((a, b) => {
        let comparison = 0;
        const field = filters.sortBy;
        
        if (field === 'createdAt' || field === 'updatedAt') {
          comparison = new Date(a[field]).getTime() - new Date(b[field]).getTime();
        } else if (field === 'priority') {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (field === 'title') {
          comparison = a.title.localeCompare(b.title);
        }

        return filters.sortOrder === 'asc' ? comparison : -comparison;
      });

      return result;
    },

    importTodos: (importedTodos) => {
      set((state) => {
        const existingIds = new Set(state.todos.map((todo) => todo.id));
        const newTodos = importedTodos.filter((todo) => !existingIds.has(todo.id));
        const updatedTodos = [...state.todos, ...newTodos];
        saveTodos(updatedTodos);
        return { todos: updatedTodos };
      });
    },

    exportTodos: () => {
      return exportTodosUtil(get().todos);
    },
  };
});