import { Check, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import type { Todo } from '../types/todo';
import { formatDateShort } from '../utils/storage';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
};

const categoryColors: Record<string, string> = {
  工作: 'bg-blue-500',
  学习: 'bg-purple-500',
  生活: 'bg-green-500',
  娱乐: 'bg-pink-500',
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 ${
        todo.completed
          ? 'bg-gray-50 border-gray-200 opacity-60'
          : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-primary-500 border-primary-500 text-white'
            : 'border-gray-300 hover:border-primary-400'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={`text-base font-medium flex-1 ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </h3>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full border ${priorityStyles[todo.priority]}`}
          >
            {priorityLabels[todo.priority]}
          </span>
          <span
            className={`w-2 h-2 rounded-full ${categoryColors[todo.category] || 'bg-gray-400'}`}
            title={todo.category}
          />
        </div>

        {todo.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{todo.description}</p>
        )}

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
          {todo.dueDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDateShort(todo.dueDate)}
            </span>
          )}
          {todo.tags && todo.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
          title="编辑"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="删除"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}