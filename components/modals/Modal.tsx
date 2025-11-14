
import React from 'react';
import { CloseIcon } from '../icons/Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2 sm:p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-teal-600 rounded-lg sm:rounded-xl p-1 sm:p-1.5 w-full max-w-2xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-md sm:rounded-lg border-2 border-teal-600 flex flex-col flex-1 overflow-hidden">
            <div className="bg-teal-600 text-white p-3 sm:p-4 flex justify-between items-center rounded-t-sm sm:rounded-t-md flex-shrink-0">
            <h2 id="modal-title" className="text-base sm:text-xl font-bold">{title}</h2>
            <button onClick={onClose} aria-label="Close modal" className="hover:bg-teal-700 rounded-full p-1 transition-colors">
                <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
