import { useDroppable } from '@dnd-kit/react';
import { Plus } from 'lucide-react';

interface DroppableProps {
  id: number;
  title?: string;
  children: React.ReactNode;
  onAddTask?: () => void;
}

export function Droppable({ id, title, children, onAddTask }: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-3 min-w-[280px] w-72 p-4 rounded-xl border transition-all ${
        isDropTarget
          ? 'bg-ui-primary/15 border-ui-primary shadow-md scale-[1.01]'
          : 'bg-gray-50/80 border-gray-200 shadow-sm'
      }`}
    >
      {title && (
        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 text-base">{title}</h3>
          {onAddTask && (
            <button
              onClick={onAddTask}
              type="button"
              className="flex items-center gap-1 text-xs bg-ui-primary/10 hover:bg-ui-primary/20 text-ui-primary font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
              title="إضافة مهمة"
            >
              <Plus size={14} />
              <span>مهمة</span>
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 min-h-[150px]">
        {children}
      </div>
      {onAddTask && (
        <button
          onClick={onAddTask}
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-ui-primary hover:bg-white/80 border border-dashed border-gray-300 hover:border-ui-primary p-2 rounded-lg transition-all cursor-pointer mt-1"
        >
          <Plus size={14} />
          <span>إضافة مهمة جديدة</span>
        </button>
      )}
    </div>
  );
}