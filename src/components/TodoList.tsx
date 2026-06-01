'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { PlusIcon } from '@heroicons/react/24/outline';

export function TodoList() {
  const { todos, getFilteredTodos, filters, setFilter, sortBy, setSortBy } =
    useTodoStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const filteredTodos = getFilteredTodos();

  const handleOpenForm = () => {
    setEditingTodo(undefined);
    setShowForm(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <p className="text-gray-600 mt-1">
            {todos.length} total • {filteredTodos.length} shown
          </p>
        </div>
        <button
          onClick={handleOpenForm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <PlusIcon className="w-5 h-5" />
          Add Todo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              setFilter({
                status: e.target.value as 'all' | 'active' | 'completed',
              })
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilter({
                priority: e.target.value as
                  | 'all'
                  | 'low'
                  | 'medium'
                  | 'high',
              })
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search todos..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilter({
                searchQuery: e.target.value,
              })
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEditTodo}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No todos found</p>
            <p className="text-gray-400 text-sm mt-1">
              {todos.length === 0
                ? 'Create your first todo to get started'
                : 'Try adjusting your filters'}
            </p>
          </div>
        )}
      </div>

      {showForm && (
        <TodoForm
          todo={editingTodo}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}