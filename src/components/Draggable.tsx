import {useDraggable} from '@dnd-kit/react';

interface DraggableProps {
    id: number;
}

export function Draggable({id}: DraggableProps) {
  const {ref} = useDraggable({id});

  return (
    <button ref={ref} className='bg-ui-primary text-ui-insidePrimaryText font-bold py-2 px-4 m-2 rounded-lg'>
      Draggable
    </button>
  );
}