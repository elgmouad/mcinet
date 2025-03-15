import React from 'react';

export const NewControleLoi7715 = ({ newEntrepriseControle, newPointVenteControle }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-600 mb-6">Choisie le type de Projet  !</h2>
                {/* <p className="text-lg text-gray-600 mb-6">Que souhaitez-vous faire ensuite ?</p> */}
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={newEntrepriseControle}
                        className="px-4 py-2 bg-emerald-400 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Contrôler une société
                    </button>
                    <button
                        onClick={newPointVenteControle}
                        className="px-4 py-2 bg-sky-400 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Contrôler une point de vente 
                    </button>
                    {/* <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Fermer
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default NewControleLoi7715;