'use client';
import { useState } from 'react';
import { Plus, Filter, Search, Download, Upload, Trash2, SortAsc, SortDesc, ListFilter } from 'lucide-react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../types/todo';
import { getCategories, importTodos } from '../utils/storage';

const sortOptions = [
  { value: 'createdAt', label: '创建时间' },
  { value: 'updatedAt', label: '更新时间' },
  { value: 'priority', label: '优先级' },
  { value: 'title', label: '标题' },
];

const priorityOptions = [
  { value: 'all', label: '全部' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

const statusOptions = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '待完成' },
  { value: 'completed', label: '已完成' },
];

export default function TodoList() {
  const {
    todos,
    filters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilters,
    clearCompleted,
    getFilteredTodos,
    importTodos: importStoreTodos,
    exportTodos,
  } = useTodoStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTodos = getFilteredTodos();
  const categories = getCategories(todos);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleSubmit = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleExport = () => {
    const data = exportTodos();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const imported = importTodos(content);
          if (imported.length > 0) {
            importStoreTodos(imported);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">任务管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeCount} 项待完成 | {completedCount} 项已完成
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleImport}
            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="导入"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            onClick={handleExport}
            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="导出"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            添加任务
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="搜索任务..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        {/* Toggle Filters */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 mt-3 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? '隐藏筛选' : '显示筛选'}
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">状态</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">优先级</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">分类</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? '全部' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">排序</label>
              <div className="flex items-center gap-1">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })
                  }
                  className="px-2 py-2 border border-gray-300 border-l-0 rounded-r-lg hover:bg-gray-50 transition-colors"
                >
                  {filters.sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4 text-gray-500" />
                  ) : (
                    <SortDesc className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ListFilter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">暂无任务</h3>
            <p className="text-sm text-gray-400">点击上方按钮添加你的第一个任务</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={handleEdit}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={clearCompleted}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            清除已完成 ({completedCount})
          </button>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}