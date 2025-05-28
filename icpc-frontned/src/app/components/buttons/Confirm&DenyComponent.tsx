import React from 'react';

interface ConfirmDenyProps {
  onConfirm: () => void;
  onCancel: () => void;
}

/*
Input: onConfirm (callback for confirm action), onCancel (callback for cancel action)
Output: Modal with two buttons: 'Aceptar' (confirm) and 'Cancelar' (deny)
Return value: React component rendering a confirmation modal
Function: Displays a modal dialog to confirm or cancel an action, calling the appropriate callback
Variables: onConfirm, onCancel
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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