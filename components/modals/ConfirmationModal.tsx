import React from 'react';
import { CloseIcon } from '../icons/Icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'save' | 'delete' | 'logout';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  confirmText, 
  cancelText = 'Batal',
  variant = 'save'
}) => {
  if (!isOpen) return null;

  const variantClasses = {
    save: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
    delete: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    logout: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
  };

  const defaultConfirmText = {
      save: 'Simpan Data',
      delete: 'Hapus',
      logout: 'Keluar'
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      aria-labelledby="confirmation-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl w-full max-w-2xl shadow-xl p-1.5"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A5568' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl p-8 relative">
            <button 
                onClick={onClose} 
                aria-label="Close modal" 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
                <CloseIcon className="w-5 h-5" />
            </button>
            
            <h2 id="confirmation-modal-title" className="text-xl text-center font-semibold text-gray-800 mb-4">{title}</h2>
            <div className="text-gray-600 text-sm mb-8 space-y-3 leading-relaxed max-w-lg mx-auto text-left">
                {children}
            </div>
            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={onClose}
                    className="px-10 py-2.5 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    {cancelText}
                </button>
                <button
                    onClick={onConfirm}
                    className={`px-10 py-2.5 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${variantClasses[variant]}`}
                >
                    {confirmText || defaultConfirmText[variant]}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;