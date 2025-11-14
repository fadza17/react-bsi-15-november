import React from 'react';
import { CloseIcon } from '../icons/Icons';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      aria-labelledby="success-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl w-full max-w-lg shadow-xl p-1"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A5568' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl p-6 relative">
            <button 
                onClick={onClose} 
                aria-label="Close modal" 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
                <CloseIcon className="w-5 h-5" />
            </button>
            
            <div className="pr-6">
                <h2 id="success-modal-title" className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
                <div className="text-gray-600 text-sm mb-6 space-y-2 leading-relaxed">
                    {children}
                </div>
            </div>
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={onClose}
                    className="px-12 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                    Okay
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;