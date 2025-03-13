import React from 'react';
// import { Modal, Button } from 'antd'; // Utilisation de Ant Design pour un beau design

const SuccessControlModal = ({ visible, onClose, onNewCompany, onNewProduct }) => {
    if(visible){
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-green-500 mb-4">Contrôle réussi !</h2>
                    <p className="text-lg text-gray-600 mb-6">Que souhaitez-vous faire ensuite ?</p>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={onNewCompany}
                            className="px-4 py-2 bg-emerald-400 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Contrôler une autre société
                        </button>
                        <button
                            onClick={onNewProduct}
                            className="px-4 py-2 bg-sky-400 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Contrôler un autre produit (même société)
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    // return (
    //     <Modal
    //         title="Contrôle réussi !"
    //         open={visible}
    //         onCancel={onClose}
    //         footer={null}
    //         centered
    //     >
    //         <p>Le contrôle a été effectué avec succès. Que souhaitez-vous faire ?</p>
    //         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
    //             <Button type="primary" onClick={onNewCompany}>Contrôler une autre société</Button>
    //             <Button type="default" onClick={onNewProduct}>Contrôler un autre produit de la même société</Button>
    //             <Button danger onClick={onClose}>Fermer</Button>
    //         </div>
    //     </Modal>
    // );
};

export default SuccessControlModal;