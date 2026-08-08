import { useDraggable } from '@dnd-kit/react';
import { User } from 'lucide-react';

interface DraggableProps {
  id: number;
  title?: string;
  assignedTo?: string;
  children?: React.ReactNode;
}

export function Draggable({ id, title, assignedTo, children }: DraggableProps) {
  const { ref, isDragging } = useDraggable({ id });

  return (
    <div
      ref={ref}
      className={`bg-white text-gray-800 border border-gray-200 shadow-sm p-3 rounded-lg cursor-grab active:cursor-grabbing transition-all select-none w-full hover:border-ui-primary/50 ${
        isDragging ? 'opacity-40 scale-95 shadow-md' : 'opacity-100'
      }`}
    >
      {children || (
        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-sm text-gray-800 leading-snug">{title}</span>
          {assignedTo && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 pt-1.5 border-t border-gray-100">
              <span className="w-5 h-5 rounded-full bg-ui-primary/10 text-ui-primary flex items-center justify-center font-bold text-[10px]">
                <User size={12} />
              </span>
              <span className="truncate font-medium text-gray-600">{assignedTo}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}