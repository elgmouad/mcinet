import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEnterprise } from '../../../Redux/Actions/enterprise.actions';
import { createControl } from '../../../Redux/Actions/control.actions';


export const Newcontrol = () => {
  const dispatch = useDispatch()
  const theNavigate = useNavigate()
  const theLocation = useLocation();
  const {enterprises} = useSelector(state => state.enterprise)
  const [control, setcontrol] = useState({
    entID: "",
    executedAt: {executed: false, at: ''},
    pratics: [
        {name: "Affichage des prix", status: "", observation: ''},
        {name: "Etiquetage", status: "", observation: ''},
        {name: "Publicite", status: "", observation: ''},
        {name: "Garantie", status: "", observation: ''},
        {name: "Solde", status: "", observation: ''},
        {name: "Facture", status: "", observation: ''}
    ],
    validationStatus: "", 
    validation: [  
      {name: "vb", status: false},
      {name: "pv", status: false},
      {name: "validation", status: false}
    ],
    finallObservation: "",
    missionID: ""
  })
  const [selectedOption, setSelectedOption] = useState(null);
  const missionID = theLocation.state?.id
  console.log("Mission id: ", missionID)
  useEffect( ()=> {
    setcontrol(prev => ({
      ...prev,
      missionID: missionID
    }))
  }, [theLocation.state])
  const [DispalyError, setDispalyError] = useState(null)

  const [step, setStep] = useState(1)
  const steps = Array.from(document.getElementsByClassName('step'))
  useEffect(() => {
    if(!control.executedAt.executed) {
      const currentDate = new Date();
      const at = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      console.log(at)
      setcontrol(prev => ({
        ...prev,
        executedAt: {executed: true, at: at}
      }))
  }
  }, [])
  useEffect( ()=> {
    dispatch(fetchEnterprise())
  }, [dispatch])

  function isValide () {
    switch (step) {
      case 1:
        if(!control.entID) {
          setDispalyError((
              <div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Choisi un Entreprise!</p>
            </div>))
            setTimeout(() => {
              setDispalyError(null)
            }, 2000);
          return false
        }
        break;
      case 2:
        if(!control.pratics.every(p => p.status !== '')) {
          setDispalyError(
            (<div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-red-500 font-medium text-lg bg-red-200 px-4 py-3 rounded-[10px] '>Valider les pratique!</p>
            </div>)
          )
          setTimeout(() => {
            setDispalyError(null)
          }, 2000)
          return false
        }
        break;
      
      default:
        setDispalyError(null)
        return true
    }
    setDispalyError(null)
    return true
  }
  
  const next = (e)=> {
    e.preventDefault()
    if(!isValide()) return
    if(step < steps.length) {
      setStep(
        step + 1
      )
    }else {
      console.log('control Created!!')
      dispatch(createControl(control));
      console.log("After dispatch control: ", control)
      theNavigate('/dashboard/orderMissions/control/list', {state: {message: "Controle Créé avec succée!"}})
    }

  }
  
  const prev = (e)=> {
    e.preventDefault()
    if(step > 1) {
      setStep(
        step - 1
      )
    }
  }
  const handleEnterpriseSelect = (selectedEnt) => {
    setcontrol(prev => ({
      ...prev, 
      entID: selectedEnt.value
    }))
    setDispalyError(null)
  }
  const handleAddEntreprise = () => {
    theNavigate('/dashboard/entreprise/add')
  }
  
  const handleRadioChange = (index, status) => {
    setcontrol((prev) => ({
        ...prev,
        pratics: prev.pratics.map((p, i) => 
          i === index 
        ? { ...p, status : status, observation: status === "conforme" ? "" : p.observation} 
        : p
      )
    }));
  };
  
  const handleObservationChange = (index, observation) => {
    setcontrol((prev) => ({
        ...prev,
        pratics: prev.pratics.map((p, i) => i === index ? {...p, observation } : p
      )
    }))
  };
  const handleValidation = () => {
    const isValid = control.pratics.every(p => p.status === 'conforme')
    setcontrol(prev => ({
      ...prev,
      validation: prev.validation.map(item => 
        item.name === 'validation' ? { ...item, status: isValid ? true : false } : item
      )
    }));
    console.log("check pratics: ", isValid)
  }
  console.log("Check isvalid function: ", control.validation)
  useEffect(() => {
    handleValidation()
  }, [control.pratics])

  const handleFinallObservation = (observation) => {
    setcontrol(prev => ({
      ...prev,
      finallObservation: observation
    }))
  }

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="px-6 fleex flex-col ">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{"Créer Control"}</h1>
      </div>

      <form onSubmit={next} action="" className='h-full flex flex-col justify-between'>
        <div className="steps w-full min-h-full flex items-stretch justify-center">
          <div className={`step ${step === 1 ? '' : 'hidden'} w-full`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Choisi un Entreprise</p>
            <div className='flex flex-col items-start justify-center flex-wrap'>
                <label className="font-medium text-sm mb-1 gap-2">ICE *</label>
                <div className="flex gap-2 grow basis-auto max-md:w-full">
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
                      label: `${ent.raison_sociale} - ${ent.ICE}`
                    }))} 
                    onChange={handleEnterpriseSelect}
                    placeholder="Nom d'Entreprise ..."
                    noOptionsMessage={()=> "Aucune entreprise trouvé"}
                    isSearchable
                    />
                {  control.entID === '' &&
                  (<button type='button' onClick={handleAddEntreprise} className={`px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors `}>Ajouter</button>)
                }
                </div>
                { DispalyError && <p className={`basis-full text-red-500 text-sm`}>{DispalyError} </p>}

                
            </div>
          </div>
          <div className={`step ${step === 2 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Pratiques</p>
            <div>
              <div className='flex items-center justify-between gap-2'>
                <div className=''>
                  <p>Executer à: </p>
                  <p> {
                      control.executedAt.executed 
                      ? control.executedAt.at 
                      : 'Pas encore' 
                    }</p>
                </div>
                <div className=''>
                  <p>Modifier le:</p>
                  <input type="text" placeholder='2025-03-01' disabled/>
                </div>
              </div>

              <div className="pratics">
                <div className='my-2 flex flex-col items-start justify-start flex-wrap'>
                    {control.pratics && control.pratics.map((p, i) => {
                      return (
                        <div key={p.name || i} className='flex items-center flex-wrap gap-6 px-2 py-3 my-1 '>
                          <p className={`${p.status ? 'text-blue' : DispalyError ? 'text-red-500' : ''} font-medium text-base flex-initial`}>{p.name}</p>

                          <div className="flex items-center gap-3">

                            <div className={`flex items-center cursor-pointer hover:text-blue`}>
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(i, 'conforme')} className={`peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full `} type="radio" value="conforme"
                                  name={`conforme`}
                                  id={`${p.name}-conforme`}
                                  checked={p.status === "conforme"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${p.status === 'conforme' ? 'bg-blue': 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${p.name}-conforme`} className='cursor-pointer mt-2'>conforme</label>
                            </div>

                            <div className={`flex items-center cursor-pointer hover:text-blue`} >
                              <div className='grid place-items-center place-content-center mt-1'>
                                <input onChange={() => handleRadioChange(i, 'non-conforme')} className={`peer col-start-1 row-start-1 mr-2 appearance-none shrink-0 mt-1 w-4 h-4 border-2 border-blue rounded-full `} type="radio"
                                  value="non-conforme"
                                  name={`non-conforme`}
                                  id={`${p.name}-non-conforme`}
                                  checked={p.status === "non-conforme"}/>
                                <div className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${p.status === 'non-conforme' ? 'bg-blue' : 'bg-transparent'} mt-1 mr-2`}/>
                              </div>
                              <label htmlFor={`${p.name}-non-conforme`} className='cursor-pointer mt-2'>Non conforme</label>
                            </div>
                          </div>

                          {p.status === 'non-conforme' && (
                            <div className='flex flex-col basis-full '>
                              <label htmlFor="">Observation: </label>
                              <textarea 
                                className='min-w-[314px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400 max-md:w-full'
                                placeholder='Observation'
                                rows={3}
                                value={p.observation}
                                onChange={(e) => handleObservationChange(i, e.target.value)}
                                />
                            </div>
                          )}
                        </div>
                      ) 
                      
                    })}
                    {DispalyError && (<p className={`basis-full text-red-500 text-medium`}>{DispalyError}</p>)}
                </div>
              </div>
            </div>
          </div>
          <div className={`step ${step === 3 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Verification</p>
            <div>
              {
                control.pratics.map(pratic => (
                  <div className='flex flex-wrap border rounded-[10px] p-3 my-2 '>
                    <div className='basis-1/3'>
                    {
                      pratic.name
                      }</div>
                    <div className='flex  gap-2 basis-1/2'>
                    {
                      pratic.status === 'conforme' 
                      ? (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="stroke-blue icon icon-tabler icons-tabler-outline icon-tabler-checks"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>)
                      : (<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="stroke-red-500 icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>) 
                    }
                      {pratic.status.split('-').join(' ')}</div>
                    {
                      (pratic.status === 'non-conforme') 
                      ? (pratic.observation !== ''
                        ? (<div className='basis-full'>{pratic.observation}</div>)
                        : <p className='basis-full'>Aucun observation</p>
                      )
                      : null
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <div className={`step ${step === 4 ? '' : 'hidden'} w-full mb-4`}>
            <p className='text-xl font-semibold mb-2'><span className=''>{step}</span> - Validation</p>
            <div className='m-4'>
              {
                control.validation === 'Validé'
                ?  (
                  <div>
                    <h2 className="text-2xl font-bold text-green-500">Toutes les pratiques sont conformées!</h2>
                    <p className="text-lg text-gray-600 mt-2">L'entreprise répond à toutes les exigences. Vous pouvez maintenant finaliser le contrôle.</p>

                    
                    <div>
                      <p className="text-black">Statut: <span className="text-xl text-green-500 font-semibold mt-2">Validé</span></p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-red-500">Certaines pratiques ne sont pas conformées!</h2>
                    <p className="text-lg text-gray-600 mt-2">L'entreprise ne répond pas à toutes les exigences.</p>
                    <div className='flex justify-between gap-4 mt-4'>
                      <button type='button' onClick={() => handleClick('vb')} className='basis-full bg-[#F9F9F9] relative border border-[#E4E4E4] rounded-[10px] hover:!border-blue hover:bg-bg-blue hover:text-blue transition-colors px-3 h-12 flex items-center' htmlFor='vb'>
                        <p className='font-semibold'>Verbalisation</p>
                      </button>

                      <button type='button' onClick={() => handleClick('pv')} className='basis-full bg-[#F9F9F9] relative border border-[#E4E4E4] rounded-[10px] hover:!border-blue hover:bg-bg-blue hover:text-blue transition-colors px-3 h-12 flex items-center' htmlFor='pv'>
                        <p className='font-semibold'>PV</p>
                      </button>
                    </div>

                    {
                      selectedOption === 'vb' && (
                        <div className="my-4 ">
                        <label htmlFor="final-observation" className="font-medium">Verbalisation :</label>
                        <textarea
                          id="final-observation"
                          className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue placeholder-gray-400"
                          rows="3"
                          placeholder="Veuillez fournir des détails"
                          value={control.finallObservation}
                          onChange={(e) => handleFinallObservation(e.target.value)}
                        />
                      </div>
                      )
                    }

                    {
                      selectedOption === 'pv' && (
                        <form action="" className='w-full p-2 mt-2 border rounded-md'>
                          inserting the PV
                        </form>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div className={`flex items-center ${step === 1 ? 'justify-end' : 'justify-between'} mb-2`}>
          <button onClick={prev} className={`${step === 1 ? 'hidden' : ''} px-3 py-2  bg-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`} disabled={step === 1 ? true : false}>Avant</button>
          <button type='submit' onClick={next} className={`px-3 py-2  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`} >{step === steps.length ? 'Validé': 'Suivant' } </button>
        </div>
      </form>
    </div>
  )
}


export default Newcontrol