import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnterprise, getEnterpriseById } from '../../../Redux/Actions/enterprise.actions';
import { createControleLoi2409Importation } from '../../../Redux/Actions/control.actions';
import SuccessModal from '../../../Components/Utilities/SuccessControlModal';
import ErroreModal from '../../../Components/Utilities/ErroreModal';
import { fetchProducts } from '../../../Redux/Actions/product.actions';

export const NewControleLoi2409Importation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { enterprises, enterprise } = useSelector(state => state.enterprise);
    const { products, product } = useSelector(state => state.product); // Récupérer les produits depuis le state Redux
    const missionID = location.state?.id;

    const [control, setControl] = useState({
        entID: null,
        executedAt: null,
        observation: "",
        validation: "",
        missionID: missionID,
        productID: null,
        nbrControle: 0,
        status: 'Conforme',
        dateDebutAut: new Date(),
        dateFinAut: new Date(),
        productName: '',
    });

    const [step, setStep] = useState(1);
    const [displayError, setDisplayError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErroreModal, setShowErroreModal] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        dispatch(fetchEnterprise());
        dispatch(fetchProducts()); // Récupérer les produits au chargement du composant
        console.log("---------- Depusi composent voila les produits -----------", products)
    }, [dispatch]);

    useEffect(() => {
        if (control.entID) {
            dispatch(getEnterpriseById(control.entID));
        }
    }, [dispatch, control.entID]);

    useEffect(() => {
        if (!control.executedAt?.executedAt) {
            const currentDate = new Date();
            const at = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
            setControl(prev => ({
                ...prev,
                executedAt: { executed: true, at: at },
            }));
        }
    }, []);

    const handleEnterpriseSelect = (selectedEnt) => {
        setControl(prev => ({
            ...prev,
            entID: selectedEnt.value,
        }));
        setDisplayError(null);
    };

    const handleProductSelect = (selectedProduct) => {
        setControl(prev => ({
            ...prev,
            productID: selectedProduct.value,
            productName: selectedProduct.label,
        }));
        setDisplayError(null);
    };

    const handleStatusChange = (status) => {
        setControl(prev => ({
            ...prev,
            status: status,
            observation: status === 'Conforme' ? '' : prev.observation,
        }));
    };

    const handleObservationChange = (e) => {
        setControl(prev => ({
            ...prev,
            observation: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleNbrControleChange = (e) => {
        setControl(prev => ({
            ...prev,
            nbrControle: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleValidation = () => {
        const isValid = control.status === 'Conforme';
        setControl(prev => ({
            ...prev,
            validation: isValid ? 'Validé' : 'Non Validé',
        }));
    };

    useEffect(() => {
        handleValidation();
    }, [control.status]);

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1 && !control.entID) {
            // setDisplayError((
            //     <div className='absolute top-10 left-1/4 z-50 transition-all'>
            //         <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Veuillez choisir une entreprise!</p>
            //     </div>))
            // setTimeout(() => {
            //     setDisplayError(null)
            // }, 2000);

            setDisplayError("Veuillez choisir une entreprise.");
            return;
        }
        if (step === 2 && !control.productID) {
            // setDisplayError((
            //     <div className='absolute top-10 left-1/4 z-50 transition-all'>
            //         <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Veuillez choisir un produit!</p>
            //     </div>))
            // setTimeout(() => {
            //     setDisplayError(null)
            // }, 2000);
            setDisplayError("Veuillez choisir un produit.");
            return;
        }
        if (step === 2 && control.status === 'Non-Conforme' && !control.observation) {
            // setDisplayError((
            //     <div className='absolute top-10 left-1/4 z-50 transition-all'>
            //         <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Veuillez saisir une observation!</p>
            //     </div>))
            // setTimeout(() => {
            //     setDisplayError(null)
            // }, 2000);

            setDisplayError("Veuillez saisir une observation.");
            return;
        }
        if (step === 2 && control.status === 'Non-Conforme' && !control.nbrControle) {
            // setDisplayError((
            //     <div className='absolute top-10 left-1/4 z-50 transition-all'>
            //         <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Veuillez saisir le Nombre Controler!</p>
            //     </div>))
            // setTimeout(() => {
            //     setDisplayError(null)
            // }, 2000);

            setDisplayError("Veuillez saisir le Nombre Controler.");
            return;
        }
        setStep(step + 1);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleNewCompany = () => {
        setControl(prev => (
            {
                ...prev,
                entID: null,
                // executedAt: null,
                observation: "",
                validation: "",
                missionID: missionID,
                productID: null,
                nbrControle: 0,
                status: 'Conforme',
                dateDebutAut: new Date(),
                dateFinAut: new Date(),
                productName: '',
            }));
        setStep(1);
        setShowSuccessModal(false);
    };

    const handleNewProduct = () => {
        setControl(prev => ({
            ...prev,
            productID: null,
            productName: '',
            nbrControle: 0,
            status: 'Conforme',
            observation: "",
        }));
        setStep(2);
        setShowSuccessModal(false);
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setTimeout(() => {
            navigate('/dashboard/orderMissions/control/list'); // Naviguer après un court délai
        }, 100);
    };

    const handleCloseErroreModal = () => {
        setShowErroreModal(false);
        setTimeout(() => {
            navigate('/dashboard/orderMissions/control/list'); // Naviguer après un court délai
        }, 100);
    };

    const handleSubmit = () => {
        try {
            const success = dispatch(createControleLoi2409Importation(control));
            if (success) {
                setShowSuccessModal(true);

                // navigate('/dashboard/orderMissions/control/list', { state: { message: "Contrôle créé avec succès !" } });
            } else {
                setShowErroreModal(true);
                // alert("Erreur : Impossible de créer le contrôle. Veuillez réessayer !");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission du contrôle :", error);
            alert("Une erreur est survenue. Veuillez vérifier votre connexion et réessayer !");
        }
    };

    return (
        <div className="px-6 flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Créer Contrôle Loi 24 Importation</h1>
            </div>

            <form onSubmit={handleNext} className="h-full flex flex-col justify-between">
                <div className="steps w-full min-h-full flex items-stretch justify-center">
                    {displayError && (
                        <div className='absolute top-10 left-1/4 z-50 transition-all'>
                            <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px]'>{displayError}</p>
                        </div>
                    )}
                    {/* Étape 1 : Choix de l'entreprise */}
                    {step === 1 && (
                        <div className="w-full">
                            <p className="text-xl font-semibold mb-2">1 - Choisir une entreprise</p>
                            <div className="flex flex-col items-start justify-center flex-wrap">
                                <label className="font-medium text-sm mb-1 gap-2">Raison Social/ICE *</label>
                                <div className="flex gap-2 grow flex-wrap basis-auto max-md:w-full">
                                    <Select
                                        classNames={{
                                            control: (state) =>
                                                `border !rounded-[10px] px-2 !min-w-[320px] !w-full basis-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'}`,
                                            menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                                            option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                                            placeholder: () => 'text-gray-300',
                                        }}
                                        options={enterprises.map(ent => ({
                                            value: ent.ICE,
                                            label: `${ent.raison_sociale} - ${ent.ICE}`,
                                        }))}
                                        onChange={handleEnterpriseSelect}
                                        placeholder="Nom d'entreprise ..."
                                        noOptionsMessage={() => "Aucune entreprise trouvée"}
                                        isSearchable
                                    />
                                    {!control.entID && (
                                        <button
                                            type="button"
                                            onClick={() => navigate('/dashboard/entreprise/add')}
                                            className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors max-md:basis-full"
                                        >
                                            Ajouter
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Étape 2 : Choix du produit */}
                    {step === 2 && (
                        <div className="w-full">
                            <p className="text-xl font-semibold mb-2">2 - Choisir un produit</p>
                            <div className="flex flex-col items-start justify-center flex-wrap">
                                <label className="font-medium text-sm mb-1 gap-2">Produit *</label>
                                <div className="flex gap-2 grow flex-wrap basis-auto max-md:w-full">
                                    <Select
                                        classNames={{
                                            control: (state) =>
                                                `border !rounded-[10px] px-2 !min-w-[320px] !w-full basis-full focus:outline-blue ${state.isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'order-gray-300'}`,
                                            menu: () => 'border !rounded-[10px]  !mt-1 !p-0 overflow-hidden',
                                            option: () => 'hover:bg-bg-blue hover:text-blue px-4 py-0',
                                            placeholder: () => 'text-gray-300',
                                        }}
                                        options={products.map(prod => ({
                                            value: prod.id_produit,
                                            label: prod.nom_produit,
                                        }))}
                                        onChange={handleProductSelect}
                                        placeholder="Nom du produit ..."
                                        noOptionsMessage={() => "Aucun produit trouvé"}
                                        isSearchable
                                    />
                                    {!control.productID && (
                                        <button
                                            type="button"
                                            onClick={() => navigate('/dashboard/produit/add')}
                                            className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors max-md:basis-full"
                                        >
                                            Ajouter
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Statut du produit */}
                            {control.productID && (
                                <div className="mt-4">
                                    {/* <p className="text-xl font-semibold mb-2">Statut du produit</p> */}
                                    <div className="flex items-center gap-3">

                                        <div className={`flex items-center cursor-pointer hover:text-blue`}>
                                            <label className={`${control.status === 'Conforme' ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                                                <input onChange={() => handleStatusChange('Conforme')}
                                                    className={`appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full cursor-pointer`} type="radio" value="conforme"
                                                    name={`Conforme`}
                                                    checked={control.status === "Conforme"} />
                                                <p>Conforme</p>
                                            </label>
                                        </div>


                                        <div className={`flex items-center cursor-pointer hover:text-blue`} >
                                            <label className={`${control.status === 'Non-Conforme' ? 'bg-blue text-white' : ''} relative cursor-pointer px-3 py-1 rounded-[10px] bg-[#E4E4E4]`}>
                                                <input onChange={() => handleStatusChange('Non-Conforme')} className={`cursor-pointer appearance-none shrink-0 mt-1 absolute top-0 left-0 w-full h-full`} type="radio"
                                                    value="Non-Conforme"
                                                    name={`Non-Conforme`}
                                                    checked={control.status === "Non-Conforme"} />
                                                Non Conforme
                                            </label>
                                        </div>
                                    </div>

                                    {/* <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleStatusChange('Conforme')}
                                            className={`px-4 py-2 rounded-[10px] ${control.status === 'Conforme'
                                                ? 'bg-blue text-white'
                                                : 'bg-[#E4E4E4] hover:bg-bg-blue hover:text-blue'
                                                }`}
                                        >
                                            Conforme
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleStatusChange('Non-Conforme')}
                                            className={`px-4 py-2 rounded-[10px] ${control.status === 'Non-Conforme'
                                                ? 'bg-blue text-white'
                                                : 'bg-[#E4E4E4] hover:bg-bg-blue hover:text-blue'
                                                }`}
                                        >
                                            Non Conforme
                                        </button>
                                    </div> */}
                                </div>
                            )}


                            {/* Observation et nombre de produits contrôlés */}
                            {control.status === 'Non-Conforme' && (
                                <div className="mt-4">
                                    <label htmlFor="observation" className="font-medium">Observation *</label>
                                    <textarea
                                        id="observation"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        rows="3"
                                        placeholder="Observation"
                                        value={control.observation}
                                        onChange={handleObservationChange}
                                    />
                                    <label htmlFor="nbrControle" className="font-medium mt-4">Nombre de produits contrôlés *</label>
                                    <input
                                        type="number"
                                        id="nbrControle"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        value={control.nbrControle}
                                        onChange={handleNbrControleChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Étape 3 : Vérification */}
                    {step === 3 && (
                        <div className="w-full mb-4">
                            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Vérification</p>
                            <div className='flex items-center justify-between gap-2'>
                                <div className=''>
                                    <p>Modifer le: </p>
                                    <p> {
                                        control.executedAt?.executed
                                            ? control.executedAt.at
                                            : 'Pas encore'
                                    }</p>
                                </div>
                                <div className=''>
                                    <p>Executer le:</p>
                                    <input type="text" placeholder='2025-03-01' disabled />
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap border rounded-[10px] p-3 my-2 ">
                                <div className='basic-1/3'>
                                    <strong>Produit :</strong> {control.productName}
                                </div>
                                <div className='flex gap-2 basis-1/4'>
                                    {
                                        control.status === 'Conforme'
                                            ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-checks"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>)
                                            : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-red-500 icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>)
                                    }
                                    {(control.nbrControle !== 0 ? control.nbrControle + " - " : '') + control.status.split('-').join(' ')}

                                </div>
                                {
                                    (control.status === 'Non-Conforme')
                                        ? (control.observation !== ''
                                            ? (<div className='basis-full'>{control.observation} </div>)
                                            : <p className='basis-full'>Aucun observation</p>
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    )}

                    {/* Étape 4 : Validation */}
                    {step === 4 && (
                        <div className="w-full">
                            <p className="text-xl font-semibold mb-2">4 - Validation</p>
                            {control.status === 'Conforme' ? (
                                <div>
                                    <h2 className="text-2xl font-bold text-green-500">Le produit est conforme !</h2>
                                    <p className="text-lg text-gray-600 mt-2">Vous pouvez maintenant finaliser le contrôle.</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold text-red-500">Le produit n'est pas conforme !</h2>
                                    <p className="text-lg text-gray-600 mt-2">Le contrôle sera enregistré sans autorisation.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className={`flex items-center ${step === 1 ? 'justify-end' : 'justify-between'} mb-2 mt-4`}>
                    {step !== 1 && (
                        <button
                            onClick={handlePrev}
                            className="px-3 py-2 bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue transition-colors"
                        >
                            Précédent
                        </button>
                    )}
                    {step === 4 ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-3 py-2 bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue transition-colors"
                        >
                            Valider
                        </button>
                    ) : (
                        <button
                            type="submit"
                            onClick={handleNext}
                            className="px-3 py-2 bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue transition-colors"
                        >
                            Suivant
                        </button>
                    )}
                </div>
                <div>
                    {/* <button onClick={handleSubmit}>Soumettre le contrôle</button> */}

                    {/* Modale affichée en cas de succès */}
                    <SuccessModal
                        visible={showSuccessModal}
                        onClose={handleClose}
                        onNewCompany={handleNewCompany}
                        onNewProduct={handleNewProduct}
                    />
                </div>
                <div>
                    {/* <button onClick={handleSubmit}>Soumettre le contrôle</button> */}

                    {/* Modale affichée en cas de succès */}
                    <ErroreModal
                        visible={showErroreModal}
                        onClose={handleCloseErroreModal}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewControleLoi2409Importation;