import { XIcon } from "lucide-react";
import type { ReactElement } from "react";

// تحديد أنواع الـ Props لتكون مرنة ومفهومة لـ TypeScript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactElement;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-ui-surface border-ui-outline border text-ui-primaryText p-6 rounded-2xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto shadow-xl transition-all">
        
        <div className="flex justify-between items-center border-ui-outline border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} type="button" aria-label="Close modal">
            <XIcon className="cursor-pointer hover:scale-110 transition-all text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div>
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;