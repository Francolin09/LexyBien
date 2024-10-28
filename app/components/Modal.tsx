import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="text-gray-600 hover:text-gray-800 float-right"
          onClick={onClose}
        >
          X
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};