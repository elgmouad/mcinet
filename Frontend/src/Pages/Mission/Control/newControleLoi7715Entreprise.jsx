import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnterprise, getEnterpriseById } from '../../../Redux/Actions/enterprise.actions';
import { createControleLoi7715 } from '../../../Redux/Actions/control.actions';
import SuccessModal from '../../../Components/Utilities/SuccessControlModal';
import ErroreModal from '../../../Components/Utilities/ErroreModal';

export const NewControleLoi7715Entreprise = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { enterprises, enterprise } = useSelector(state => state.enterprise);
    const missionID = location.state?.id;

    const [control, setControl] = useState({
        entID: null,
        executedAt: null,
        observation: "",
        validation: "",
        missionID: missionID,
        qntSacsPlasticsNonConforme: null,
        qntPrdEncourSaisis: null,
        qntMatierPremierSaisis: null,
        avisTech: "",
        isAvisTech: false,
        isCompanyUnit: true
    });

    const [step, setStep] = useState(1);
    const [displayError, setDisplayError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErroreModal, setShowErroreModal] = useState(false);
    const [erroreMessage, setErroreMessage] = useState("");
    const [avisTech, setAvisTech] = useState(false);

    useEffect(() => {
        dispatch(fetchEnterprise());
        console.log("---------- Depusi composent voila les produits -----------", enterprises)
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

    const handleObservationChange = (e) => {
        setControl(prev => ({
            ...prev,
            observation: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleAvisTechChange = (e) => {
        const text = e.target.value;
        setControl(prev => ({
            ...prev,
            avisTech: text,
            isAvisTech: avisTech
        }));
        setDisplayError(null);

    };

    const handleAvisTechToggle = () => {
        setAvisTech(!avisTech); // Basculer l'état avisTech
        if (!avisTech) {
            // Si l'utilisateur désactive l'option, réinitialiser l'avis technique
            setControl(prev => ({
                ...prev,
                avisTech: "",
                isAvisTech: false,
            }));
        }
        setDisplayError(null);
    };

    const handleQntSacsPlasticsNonConformeChange = (e) => {
        setControl(prev => ({
            ...prev,
            qntSacsPlasticsNonConforme: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleQntPrdEncourSaisisChange = (e) => {
        setControl(prev => ({
            ...prev,
            qntPrdEncourSaisis: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleQntMatierPremierSaisisChange = (e) => {
        setControl(prev => ({
            ...prev,
            qntMatierPremierSaisis: e.target.value,
        }));
        setDisplayError(null);
    };

    const handleValidation = () => {
        const isValid = (control.qntSacsPlasticsNonConforme <= 0 && control.qntPrdEncourSaisis <= 0 && control.qntMatierPremierSaisis <= 0);
        setControl(prev => ({
            ...prev,
            validation: isValid ? 'Validé' : 'Non Validé',
        }));
    };

    useEffect(() => {
        handleValidation();
    }, [control.qntMatierPremierSaisis]);

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1 && !control.entID) {

            setDisplayError("Veuillez choisir une entreprise.");
            return;
        }
        if (step === 1 && !control.qntSacsPlasticsNonConforme) {
            setDisplayError("Veuillez saisir la Quantite de Sacs en Plastics Non Conforme.");
            return;
        }
        if (step === 1 && !control.qntPrdEncourSaisis) {

            setDisplayError("Veuillez saisir la Quantite des Produit encours Saisis.");
            return;
        }
        if (step === 1 && !control.qntMatierPremierSaisis) {

            setDisplayError("Veuillez saisir la Quantite de Matiere Premiere Saisis.");
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
                validation: "Validé",
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
        // setTimeout(() => {
        //     navigate('/dashboard/orderMissions/control/list'); // Naviguer après un court délai
        // }, 100);
    };

    const handleSubmit = async () => {
        try {
            if (avisTech && control.avisTech.length < 5) {
                setDisplayError("L'avis technique doit contenir au moins 10 caractères.");
                return;
            }

            const response = await dispatch(createControleLoi7715(control));
            console.log("Reponse Recue =============>", response?.success);
            if (response?.success) {
                setShowSuccessModal(true);

                // navigate('/dashboard/orderMissions/control/list', { state: { message: "Contrôle créé avec succès !" } });
            } else {
                setShowErroreModal(true);
                setErroreMessage("Erreur : Impossible de créer le contrôle. Veuillez réessayer !");
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
                <h1 className="text-3xl font-bold text-gray-800">Créer Contrôle Loi 77-15 Entreprise</h1>
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
                            {control.entID && (
                                <div className="mt-4">

                                    <label htmlFor="nbrControle" className="font-medium">Quantite des Sacs en Plastics Non Conforme *</label>
                                    <input
                                        type="number"
                                        id="qntSacPlasticNonConf"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        value={control.qntSacsPlasticsNonConforme}
                                        onChange={handleQntSacsPlasticsNonConformeChange}
                                    />

                                    <label htmlFor="nbrControle" className="font-medium mt-4">Quantite des Produits encours saisis *</label>
                                    <input
                                        type="number"
                                        id="qntPrdEncourSaisis"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        value={control.qntPrdEncourSaisis}
                                        onChange={handleQntPrdEncourSaisisChange}
                                    />

                                    <label htmlFor="nbrControle" className="font-medium mt-4">Quantite de matiere premiere saisis *</label>
                                    <input
                                        type="number"
                                        id="qntMatierPremierSaisis"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        value={control.qntMatierPremierSaisis}
                                        onChange={handleQntMatierPremierSaisisChange}
                                    />
                                    <label htmlFor="observation" className="font-medium mt-4">Observation </label>
                                    <textarea
                                        id="observation"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        rows="3"
                                        placeholder="Observation"
                                        value={control.observation}
                                        onChange={handleObservationChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Étape 2 : Vérification */}
                    {step === 2 && (
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
                                    <strong>Entreprise :</strong> {control.entID}
                                </div>
                                <div className='flex gap-2 basis-1/4'>
                                    {
                                        (control.qntSacsPlasticsNonConforme <= 0 && control.qntPrdEncourSaisis <= 0 && control.qntMatierPremierSaisis <= 0)
                                            ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-checks"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>)
                                            : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="stroke-red-500 icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>)
                                    }
                                </div>
                            </div>

                            <div className="flex gap-4 flex-wrap border rounded-[10px] p-3 my-2 ">
                                <div className='py-2 space-y-2'>
                                    <p>Quantite des sacs en plastics non-conforme : {control.qntSacsPlasticsNonConforme !== 0 ? control.qntSacsPlasticsNonConforme : '0'}</p>
                                    <p>Quantite des Produits encours saisis : {control.qntPrdEncourSaisis !== 0 ? control.qntPrdEncourSaisis : '0'}</p>
                                    <p>Quantite de matiere premiere saisis : {control.qntMatierPremierSaisis !== 0 ? control.qntMatierPremierSaisis : '0'}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap border rounded-[10px] p-3 my-2 ">
                                {
                                    control.observation !== ''
                                        ? (<div className='basis-full'>{control.observation} </div>)
                                        : <p className='basis-full'>Aucun observation</p>
                                }
                            </div>
                        </div>
                    )}

                    {/* Étape 3 : Validation */}
                    {step === 3 && (
                        <div className="w-full">
                            <p className="text-xl font-semibold mb-2">4 - Validation</p>
                            {(control.qntSacsPlasticsNonConforme <= 0 && control.qntPrdEncourSaisis <= 0 && control.qntMatierPremierSaisis <= 0)
                                ? (
                                    <div>
                                        <h2 className="text-2xl font-bold text-green-500">L'entreprise Respecte les norme de production !</h2>
                                        <p className="text-lg text-gray-600 mt-2">Vous pouvez maintenant finaliser le contrôle.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="text-2xl font-bold text-red-500">L'entreprise ne Respecte pas les norme de production !</h2>

                                    </div>
                                )}
                            <div className="flex items-center gap-3">

                                <div className={`flex items-center cursor-pointer hover:text-blue`}>
                                    <label className={`text-blue relative cursor-pointer my-4 px-2 py-1 rounded-[10px] bg-[#f5f4f4] flex items-center gap-2`}>
                                        {/* Icône dynamique */}
                                        {avisTech ? (
                                            // Icône "-" (moins) si avisTech est true
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-minus"
                                            >
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        ) : (
                                            // Icône "+" (plus) si avisTech est false
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-plus"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                        )}

                                        {/* Case à cocher */}
                                        <input
                                            onChange={handleAvisTechToggle}
                                            className={`cursor-pointer appearance-none shrink-0`}
                                            type="checkbox"
                                            checked={avisTech}
                                        />

                                        {/* Texte */}
                                        <span>Ajouter une Avis Technique</span>
                                    </label>
                                </div>
                            </div>

                            {avisTech && (
                                <div className="mt-2 mx-2">
                                    <label htmlFor="avisTech" className="font-medium">Avis Technique *</label>
                                    <textarea
                                        id="avisTech"
                                        className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                                        rows="3"
                                        placeholder="Avis Technique"
                                        value={control.avisTech}
                                        onChange={handleAvisTechChange}
                                    />
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
                    {step === 3 ? (
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
                        message={erroreMessage}
                        onClose={handleCloseErroreModal}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewControleLoi7715Entreprise;