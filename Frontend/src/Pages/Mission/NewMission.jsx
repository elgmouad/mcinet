import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import PrintableMission from '../../Components/Utilities/PrintableMission'
import Instance from "../../Api/axios";
import { createOrderMission } from '../../Redux/Actions/orderMission.actions';



function NewMission() {
  const location = useLocation();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false)
  const [search, setSearch] = useState("");
  const [cadreList, setCadreList] = useState([]);
  const [selectedCadre, setSelectedCadre] = useState(null);
  const [serviceCars, setServiceCars] = useState([]);

  const [accompaniedSearch, setAccompaniedSearch] = useState("");
  const [accompaniedList, setAccompaniedList] = useState([]);
  const [selectedAccompanied, setSelectedAccompanied] = useState(null);

  const [destinationList, setDestinationList] = useState([]);
  const [objectOptions, setObjectOptions] = useState([]);
  const [modalPopUpPrint, setModalPopUpPrint] = useState(false)
  const [selectCar, setSelectCar] = useState("service");

  const [cadre, setCadre] = useState({
    id: "",
    nom: "",
    prenom: "",
    delegation: "",
    grade: "",
    carPlat: null
  });

  const [mission, setMission] = useState({
    missionId: null,
    cadreId: "",
    destinationId: "",
    destinationName: "",
    objectId: "",
    objectName: "",
    depDate: "",
    depHour: null,
    arrHour: null,
    durationDays: "",
    plateNumber: null,
    companion: null
  });
  const [hidePrint, setHidePrint] = useState(true)

  // -- Fetching From API :
  // ----- Fetch Object Options
  useEffect(() => {
    const fetchObjectOptions = async () => {
      try {
        const response = await Instance.get("/missions/getObjectOptions");
        setObjectOptions(response.data.objects || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchObjectOptions();
  }, []);

  // ----- Fetch Accompanied Cadres
  useEffect(() => {
    const fetchAccompaniedCadres = async () => {
      if (accompaniedSearch.trim() === "") {

        setAccompaniedList([]);
        return;
      }
      try {
        const response = await Instance.post("/missions/searchCadre", { name: accompaniedSearch });
        setAccompaniedList(response.data.cadres || []);
      } catch (error) {
        console.error(error);
        setAccompaniedList([]);
      }
    };
    const timer = setTimeout(fetchAccompaniedCadres, 200);
    return () => clearTimeout(timer);
  }, [accompaniedSearch]);

  // ----- Fetch Destination List:
  useEffect(() => {
    const fetchDestinationList = async () => {
      try {
        const response = await Instance.get("/missions/getDestinations");
        setDestinationList(response.data.destinations);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDestinationList();
  }, []);


  // ----- Fetch Service Cars:
  useEffect(() => {
    const fetchServiceCars = async () => {
      try {
        const response = await Instance.get("/missions/getServiceCars");
        setServiceCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServiceCars();
  }, []);

  // ----- Fetch Cadres Based on Search Input:
  useEffect(() => {
    const fetchData = async () => {
      if (search.trim() === "") {
        setCadreList([]);
        return;
      }
      try {
        const response = await Instance.post("/missions/searchCadre", { name: search });
        setCadreList(response.data.cadres || []);
      } catch (error) {
        console.log(error.response.data);
        setCadreList([]);
      }
    };
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // ----- Edite Mssion :
  useEffect(() => {
    const fetchMissionDetails = async () => {
      const id = new URLSearchParams(window.location.search).get("id")
    }

    fetchMissionDetails();
  }, [])

  // ----- Fetching datat from list page :
  useEffect(() => {
    if (location.state?.missionData) {
      setHidePrint(false)
      const formatDepDate = location.state.missionData.departure_date.split("T")[0]

      setCadre(prev => ({
        ...prev,
        id: location.state.missionData.cadre_id,
        nom: location.state.missionData.cadre_nom,
        prenom: location.state.missionData.cadre_prenom,
        delegation: location.state.missionData.delegation,
        grade: location.state.missionData.grade_name,
        carPlat: null
      }))
      setMission(prev => ({
        ...prev,
        cadreId: location.state.missionData.cadre_id,
        missionId: location.state.missionData.mission_id,
        destinationId: location.state.missionData.Id_des,
        objectId: location.state.missionData.Id_object,
        depDate: formatDepDate,
        depHour: location.state.missionData.heure_de_depart,
        arrHour: location.state.missionData.heure_arrive,
        durationDays: location.state.missionData.duration_days,
        plateNumber: location.state.missionData.s_matricule,
        companion: location.state.missionData.companion,
      }))
      setSearch(`${location.state.missionData.cadre_nom} ${location.state.missionData.cadre_prenom}`)
      setEditMode(true)
    }
  }, [location.state])


  // -- Handlers :
  // handling inputs values
  const handleCadreChange = (selected) => {
    console.log('detec the selected cadre: ', selected.cadre_id)
    setSelectedCadre(selected);
    setSearch(`${selected.nom} ${selected.prenom}`);

    setCadre({
      id: selected.cadre_id,
      nom: selected.nom,
      prenom: selected.prenom,
      delegation: selected.delegation,
      grade: selected.grade_name,
      carPlat: selected.p_matricule
    })
    setMission(prev => ({
      ...prev,
      cadreId: selected.cadre_id,
    }))

    if (selectCar === "service") {
      console.log("Check the selected car: ", selectCar)
      setCadre(prev => ({
        ...prev,
        carPlat: null
      }))
    }
  };

  const selectedDestination = destinationList.find(destination => { return destination.Id_des === mission.destinationId });
  const destinationName = selectedDestination ? selectedDestination.Destination : "Aucune destination";
  const selectedObject = objectOptions.find(object => { return object.Id_object === mission.objectId });
  const objectName = selectedObject ? selectedObject.Object_type : "Aucun objet";

  const handleMissionChange = (e) => {
    const { name, value } = e.target


    setMission((prev) => ({
      ...prev,
      [name]: value,
      destinationName: destinationName,
      objectName: objectName,
    }))
    if (selectCar === "personal") {
      setMission(prev => ({
        ...prev,
        plateNumber: null
      }))
    }
    if (
      cadre.nom !== '' &&
      cadre.prenom !== '' &&
      mission.durationDays !== '' &&
      mission.depDate !== '' &&
      mission.destinationId !== '' &&
      mission.objectId !== ''
    ) {
      setHidePrint(!hidePrint)
    }
  };



  // when submite the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (editMode) {
        const result = await Instance.put(`/missions/updateOrderMission/${mission.missionId}`, mission)
        console.log("-- Result of edit: ", result)
        if (result.status === 200) {
          navigate('/dashboard/orderMissions/listMissionOrders')
        } else {
          console.log("error edit mission")
        }
      } else {
        const result = await Instance.post('/missions/createOrderMission', mission)
        console.log("-- Result of submit: ", result)
        if (result.status === 201) {
          navigate('/dashboard/orderMissions/listMissionOrders')
          setHidePrint(false)
        }
      }

    } catch (error) {
      console.log('error submite the mission', error.response?.data || error)
      throw error
    }
  };

  const handleIgnore = () => {
    setCadreList([])
    setAccompaniedList([])
    setSearch("")
    setAccompaniedSearch("")
    setDestinationList([])
    setObjectOptions([])
    setHidePrint(false)
  }

  const handlepopUp = () => {
    console.log(modalPopUpPrint)
    setModalPopUpPrint(!modalPopUpPrint)
  };



  const handlePrint = () => {
    if (!hidePrint) {
      const printArea = document.getElementById("print-area").innerHTML;
      
      const printConten = document.body.innerHTML;

      document.body.innerHTML = printArea;
      window.print()
      document.body.innerHTML = printConten;
      window.location.reload()
    }

  }

  return (
    <div className="p-6 max-md:p-0 max-md:px-3">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{editMode ? "Modifier l'Ordre de Mission" : "Créer Ordre Mission"}</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg my-4 max-md:flex max-md:flex-col"
      >
        {/* Groupe: Nom et Titre */}
        <div className="flex gap-6 mb-4 max-md:flex-col ">
          <div className=" flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Nom*</label>
            <div className="relative flex flex-col flex-1 ">
              <input
                type="text"
                name="nom"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nom..."
                className="border rounded-lg px-4 py-2 focus:outline-blue"
                required
              />
              <div className={`absolute top-11 left-0 w-full cadre-list ${cadreList.length > 0 ? 'border' : ''} rounded-lg  bg-white`}>
                {cadreList.length > 0 &&
                  cadreList.map((cadre, i) => (
                    <div
                      key={i}
                      onClick={() => handleCadreChange(cadre)}
                      className="px-4 py-2 cursor-pointer hover:bg-bg-blue hover:text-blue">
                      {cadre.nom} {cadre.prenom}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 ">
            <label className="">Titre*</label>
            <input
              type="text"
              name="grade"
              value={cadre.grade}
              onChange={handleCadreChange}
              placeholder="Titre..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
            />
          </div>
        </div>

        {/* Groupe: Délégation et Destination */}
        <div className="flex gap-6 mb-4 max-md:flex-col">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Délégation*</label>
            <input
              type="text"
              name="delegation"
              value={cadre.delegation}
              onChange={handleCadreChange}
              placeholder="Délégation..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              
            />
          </div>

          {/*  Destination */}
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Destination*</label>
            <select
              name="destinationId"
              value={mission.destinationId}
              onChange={handleMissionChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
            >
              <option value="" disabled>Sélectionnez une destination</option>
              {destinationList.map(destination => (
                <option key={destination.Id_des} value={destination.Id_des}>
                  {destination.Destination || "Aucune destination"}
                </option>
              ))}
            </select>
          </div>

        </div>


        {/* Objet */}
        <div className="flex flex-col mb-4">
          <label className="font-medium text-sm mb-1">Objet</label>
          <select
            name="objectId"
            value={mission.objectId}
            onChange={handleMissionChange}
            className="border rounded-lg px-4 py-2 focus:outline-blue"
            required
          >
            <option value="" disabled>Sélectionnez un objet...</option>
            {objectOptions.map(object => (
              <option key={object.Id_object} value={object.Id_object || ""}>
                {object.Object_type || "Aucun objet"}
              </option>
            ))}
          </select>
        </div>


        {/* Groupe: Date et Heure */}
        <div className="flex gap-6 mb-4 max-md:flex-col">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Date départ*</label>
            <input
              type="date"
              name="depDate"
              value={mission.depDate}
              onChange={handleMissionChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue"

            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Heure départ*</label>
            <input
              type="time"
              name="depHour"
              value={mission.depHour}
              onChange={handleMissionChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue"

            />
          </div>
        </div>

        {/* Groupe: Heure arrivée et Durée */}
        <div className="flex gap-6 mb-4 max-md:flex-col">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Heure d'arrivée*</label>
            <input
              type="time"
              name="arrHour"
              value={mission.arrHour}
              onChange={handleMissionChange}
              className="border rounded-lg px-4 py-2 focus:outline-blue"

            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Durée de la mission*</label>
            <input
              type="text"
              name="durationDays"
              value={mission.durationDays}
              onChange={handleMissionChange}
              placeholder="Durée (en heures)..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"

            />
          </div>
        </div>


        <div className="flex flex-col gap-6 mb-4">

          <div className="flex gap-4 items-center">
            <p className="font-medium text-sm mb-1 mr-4">Voiture: </p>
            <div className="flex items-center gap-3">
              <div>
                <label className="flex gap-2" htmlFor="personal">
                  <input
                    type="radio"
                    value="personal"
                    checked={selectCar === "personal"}
                    onChange={(e) => setSelectCar(e.target.value)}
                    name="personal" id="personal" />
                  Personel
                </label>
              </div>
              <div>
                <label className="flex gap-2" htmlFor="service">
                  <input
                    type="radio"
                    value="service"
                    checked={selectCar === "service"}
                    onChange={(e) => setSelectCar(e.target.value)}
                    name="service" id="service" />
                  Service
                </label>
              </div>
            </div>
          </div>

          <div className="">
            {
              selectCar === 'personal' && (
                <div className="flex flex-col flex-1">
                  <input
                    type="text"
                    name="carPlat"
                    value={cadre.carPlat}
                    onChange={handleCadreChange}
                    placeholder="Matricule de la voiture"
                    className="border rounded-lg px-4 py-2 focus:outline-blue"
                    required
                  />
                </div>
              )}

            {
              selectCar === 'service' && (
                <div className="flex flex-col">
                  <select
                    defaultValue={'default'}
                    name="plateNumber"
                    value={mission.plateNumber}
                    onChange={handleMissionChange}
                    className="border rounded-lg px-4 py-2 focus:outline-blue"
                  >
                    <option defaultValue={'default'} selected={true} >Sélectionnez une voiture</option>
                    {serviceCars.map((car, i) => (
                      <option key={i} value={car.s_matricule || ""}>
                        {car.model || "Aucun"} - ({car.s_matricule})
                      </option>
                    ))}
                  </select>
                </div>
              )
            }
          </div>
        </div>


        {/* Sera accompagné de */}
        <div className="flex flex-col">
          <label className="font-medium text-sm mb-1">Sera accompagné de</label>
          <div className="relative flex flex-col">
            {/* <input
              type="text"
              value={accompaniedSearch}
              onChange={(e) => setAccompaniedSearch(e.target.value)}
              placeholder="Nom d'accompagnateur..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
            />
            <div className={`absolute top-11 left-0 w-full bg-white border rounded-lg ${accompaniedList.length > 0 ? 'border' : ''}`}>
              {accompaniedList.map((cadre, i) => (
                <div
                  key={i}
                  onClick={() => handleAccompaniedChange(cadre)}
                  className="px-4 py-2 cursor-pointer hover:bg-bg-blue hover:text-blue"
                >
                  {cadre.prenom} {cadre.nom}
                </div>
              ))}
            </div> */}
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
              type="button"
              onClick={handlepopUp}
              className={`${hidePrint ? 'hidden' : ''} px-3 py-2 bg-[#E4E4E4] border-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`}
            >
              Imprimer
            </button>

            <button
              type="submit"
              className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors max-md:basis-full"
            >
              {editMode ? "Mettre à jour" : "Sauvegarder"}
            </button>
          </div>
        </div>
      </form>

      {modalPopUpPrint &&
        (
          <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center  h-screen w-screen overflow-hidden bg-gray-600/55">
            <div className="relative w-fit bg-white m-12 p-8 rounded-[12px] shadow-md overflow-y-auto no-scrollbar">
              <span onClick={handlepopUp} className='absolute left-4 top-4 z-50 p-2 rounded-[10px] bg-bg-blue'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-white hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
              </span>
              <PrintableMission id="print-area" cadre={cadre} mission={mission} close={modalPopUpPrint} />
              <div className="w-[580px] my-4 pb-4 absolute flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleIgnore}
                  className="px-3 py-2 bg-[#E4E4E4] border-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-[rgba(255,156,156,0.44)] hover:text-[#DC2626] transition-colors "
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-2 bg-[#E4E4E4] border-[#E4E4E4] font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors "
                >
                  Imprimer
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>

  );
}

export default NewMission;