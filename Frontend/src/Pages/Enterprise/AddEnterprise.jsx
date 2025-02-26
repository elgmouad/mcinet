import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addEnterprise, updateEntreprise } from '../../Redux/Actions/enterprise.actions'

function AddEnterprise() {
  const theLocation = useLocation();
  const theNavigate = useNavigate()
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [Entreprise, setEntreprise] = useState({
      ICE: "",
      raison_sociale: "",
      adresse_siege: "",
      region: "",
      province_prefecture: "",
      taille_entreprise: "",
      forme_juridique: "",
      numero_rc: "",
      identifiant_fiscal: "",
      numero_cnss: "",
      point_contact_nom: "",
      email: "",
      telephone: "",
      secteur_entreprise: "",
      zone_industrielle: "",
  })
  
  useEffect(() => {
    if (theLocation.state?.data) {
      setEditMode(theLocation.state.isEdit);
      setEntreprise(theLocation.state.data)
      console.log("the location: ",theLocation.state.data)
    }
  }, [theLocation.data])

  const handleEntrepriseChange = (e) => {
    const {name, value} = e.target
    setEntreprise(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleIgnore = (e) => {
    e.preventDefault()

    setEntreprise({})
    setEditMode(false);
    theNavigate('/dashboard/entreprise/list')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(editMode) {
      const success = await dispatch(updateEntreprise(Entreprise.ICE, Entreprise))
      if(success) theNavigate('/dashboard/entreprise/list')
      
    } else {
      const success = await dispatch(addEnterprise(Entreprise));
      if(success) theNavigate('/dashboard/entreprise/list')
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{editMode ? "Modifier l'Entreprise" : "Créer Nouveau Entreprise"}</h1>
      </div>


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg my-4"
      >
        
        <div className="lg:flex lg:gap-2">
          <div className=" flex flex-wrap basis-[60%] gap-6 mb-4">
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Raison Sociale *</label>
              <input
                type="text"
                name="raison_sociale"
                value={Entreprise.raison_sociale}
                onChange={handleEntrepriseChange}
                placeholder="Raison Sociale..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">ICE *</label>
              <input
                type="text"
                name="ICE"
                value={Entreprise.ICE}
                onChange={handleEntrepriseChange}
                placeholder="ICE..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Region *</label>
              <input
                type="text"
                name="region"
                value={Entreprise.region}
                onChange={handleEntrepriseChange}
                placeholder="Region..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Province/Prefecture *</label>
              <input
                type="text"
                name="province_prefecture"
                value={Entreprise.province_prefecture}
                onChange={handleEntrepriseChange}
                placeholder="Province/Prefecture..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Zone Industrielle *</label>
              <input
                type="text"
                name="zone_industrielle"
                value={Entreprise.zone_industrielle}
                onChange={handleEntrepriseChange}
                placeholder="Zone Industrielle..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Adresse Siege *</label>
              <input
                type="text"
                name="adresse_siege"
                value={Entreprise.adresse_siege}
                onChange={handleEntrepriseChange}
                placeholder="Adresse Siege..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Taille Entreprise*</label>
              <input
                type="text"
                name="taille_entreprise"
                value={Entreprise.taille_entreprise}
                onChange={handleEntrepriseChange}
                placeholder="Taille Entreprise..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Forme Juridique*</label>
              <input
                type="text"
                name="forme_juridique"
                value={Entreprise.forme_juridique}
                onChange={handleEntrepriseChange}
                placeholder="Forme Juridique..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Numero RC *</label>
              <input
                type="text"
                name="numero_rc"
                value={Entreprise.numero_rc}
                onChange={handleEntrepriseChange}
                placeholder="Numero RC..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Identifiant Fiscal *</label>
              <input
                type="text"
                name="identifiant_fiscal"
                value={Entreprise.identifiant_fiscal}
                onChange={handleEntrepriseChange}
                placeholder="Identifiant Fiscal..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Numero CNSS *</label>
              <input
                type="text"
                name="numero_cnss"
                value={Entreprise.numero_cnss}
                onChange={handleEntrepriseChange}
                placeholder="Numero CNSS..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Telephone *</label>
              <input
                type="text"
                name="telephone"
                value={Entreprise.telephone}
                onChange={handleEntrepriseChange}
                placeholder="Telephone..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Email *</label>
              <input
                type="text"
                name="email"
                value={Entreprise.email}
                onChange={handleEntrepriseChange}
                placeholder="Email..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Secteur Entreprise *</label>
              <input
                type="text"
                name="secteur_entreprise"
                value={Entreprise.secteur_entreprise}
                onChange={handleEntrepriseChange}
                placeholder="Secteur Entreprise..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
            <div className=" flex flex-col grow basis-auto">
              <label className="font-medium text-sm mb-1">Point Contact Nom *</label>
              <input
                type="text"
                name="point_contact_nom"
                value={Entreprise.point_contact_nom}
                onChange={handleEntrepriseChange}
                placeholder="Point Contact Nom..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                
              />
            </div>
          </div>

          <div className="flex items-center justify-center basis-[40%] shrink-1 grow w-full h-vh bg-bg-blue rounded-[10px]">
            map is here
          </div>
        </div>

        {/* Groupe: Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleIgnore}
            className="px-3 py-2  font-medium font-poppins text-base rounded-[10px] hover:!bg-[rgba(255,156,156,0.44)] hover:text-[#DC2626] transition-colors "
          >
            Annuler
          </button>
          <div className="flex justify-end gap-4">

            <button
              type="submit"
              className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
            >
              {editMode ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>


    </div>

  );
}


export default AddEnterprise;