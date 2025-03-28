import React from 'react';

interface ConfirmDenyProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDenyComponent: React.FC<ConfirmDenyProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">¿Confirmar Acción?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Aceptar
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDenyComponent;