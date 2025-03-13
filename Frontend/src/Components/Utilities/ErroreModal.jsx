import React from 'react';

const ErrorModal = ({visible, message, onClose }) => {
    if (visible) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Erreur</h2>
                    <p className="text-lg text-gray-600 mb-6">{message}</p>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ErrorModal;