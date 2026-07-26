import { useDroppable } from '@dnd-kit/react';

interface DroppableProps {
  id: number;
  children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className={`border border-dashed min-w-[500px] min-h-[150px] p-4 border-ui-primary/50 rounded-xl text-ui-primary font-bold text-3xl flex flex-col items-center justify-center gap-3 transition-all ${isDropTarget ? 'bg-ui-primary/10' : 'bg-ui-primary/5'
        }`}
    >      {children}
    </div>
  );
}