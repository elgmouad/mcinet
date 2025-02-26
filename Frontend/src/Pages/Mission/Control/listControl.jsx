import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOnClickOutside } from '../../../Hooks/useOnClickOutside'
import { fetchControls } from '../../../Redux/Actions/control.actions'
import { fetchOrderMissions } from '../../../Redux/Actions/orderMission.actions'

export const ListControl = ({ role, user}) => {
  const dispatch = useDispatch()
  const theNavigation = useNavigate()
  const theLocation = useLocation()
  const { controls, loading, error} = useSelector(state => state.control)
  const { orderMissions } = useSelector(state => state.orderMission)

  const initialMessage = theLocation.state?.message || ""
  const [message, setMessage] = useState(initialMessage)
  const [filter, setFilter] = useState(null)
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false)
  const [collapse, setCollapse] = useState({})
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 2000);

    return ()=> clearTimeout(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchControls())
    dispatch(fetchOrderMissions(role, user.id_utilisateur))
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPage = (Math.ceil(orderMissions.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage
  const showMaxBtn = totalPage >= 4 ? 3 : 2
  const handlenavigation = ()=> {
      if(totalPage <= showMaxBtn) {
          return Array.from({ length: totalPage }).map(i => i)
      }else {
          const pages = []
          if(currentPage - 1 >= 1) {
              pages.push(currentPage - 1)
          }
          pages.push(currentPage)
          if(currentPage + 1 <= totalPage) {
              pages.push(currentPage + 1)
          }
          console.log('Display: ', pages)
          return pages
      }
  }

  const statusList = [
    { id: 0, label: "Tous" },
    { id: 2, label: "En Cours" },
    { id: 3, label: "Validé" }
  ];
  const handleFilterChange = orderMissions.filter((mission) => {
    if (!filter || filter === 'Tous') return true;
    return mission.status === filter
  })
  let filterMenuRef = useRef()
  useOnClickOutside(filterMenuRef, () => setFilterMenuOpen(false) )
  
  const handleSearchByEnterprise = (e) => {
    const value = e.target
    const result = orderMissions.filter(ent => (
      // const res = value.enterprise === ent.name ? 
      console.log(ent)
    ))
  }

  // console.log("Control list: ",controls)
  const handleMissionControlsCollaps = (index) => {
    setCollapse(prev => ({
      ...prev,
      i: index, 
      [index]: !prev[index]
    }))
    console.log("isCOllapsed", collapse)
  }


  const nextPage = ()=> {
    if(currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // const filterControlByMissions = ()=> {
    const byControl = orderMissions.map(o => (
      controls.filter(c => {
        if (o.mission_id === c.mission_id) {
          console.log(c)
        }
      })
    ))

    function dateFormat(dateValue) {
      if(!dateValue) return 'N/A';
      const date = new Date(dateValue);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };
  return (
    <div>
      <h1> 
        {
          message && (
            <div className='absolute top-10 left-1/4 z-50 transition-all'>
              <p className='text-green-500 font-medium text-lg bg-green-200 px-4 py-3 rounded-[10px] transition delay-150 duration-300 ease-in-out'>{message}</p>
            </div>
          )
        }
      </h1>
      
      <div className="header flex items-center justify-between flex-wrap">
        <h1 className='font-poppins font-bold text-3xl basis-full mb-4'>List des Control</h1>
        
        <div className='basis-1/2'>
          <div className='searchBox flex justify-center items-center w-[334px] h-[38px] px-3 rounded-[10px] border-border border focus-within:border-blue overflow-hidden max-md:basis-full max-md:justify-center max-md:w-full'>
              <span className=''>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#B6B6B6"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              </span>
              <input type="text" onChange={handleSearchByEnterprise} placeholder='Chercher par entreprise ....' className='w-full h-full bg-transparent outline-none ml-2'/>
          </div>
        </div>
        {/* filter menu */}
        {role !== "CADRE" &&
        (<div className="filter flex items-center justify-end basis-1/2 w-full gap-4 my-2" >
          <p className='font-medium text-base'>Trier par: </p>

          <div className='flex items-center justify-between gap-2 relative' ref={filterMenuRef}>
            {/* <span value="cadre" className='bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors'>Cadres</span> */}
            <span value="status" onClick={() => setFilterMenuOpen(!isFilterMenuOpen)} className={`relative bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors ${isFilterMenuOpen ? 'bg-bg-blue' : ''}`}>
                <div className={`flex items-center justify-center gap-1 ${isFilterMenuOpen ? 'text-blue' : ''}`}>
                  <span>Statue: { filter || 'Tous'}</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`hover:text-blue ${isFilterMenuOpen ? 'rotate-90' : ''} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                  </span>
                </div>
            </span>
              { isFilterMenuOpen &&
                (<div className='absolute top-12 right-0 z-50 bg-[#E4E4E4] rounded-[10px] overflow-hidden'>
                {
                  statusList.map(status => (
                        <div key={status.id} onClick={() => {
                                      setFilter(status.label)
                                      setFilterMenuOpen(false)
                                      console.log(filter)
                                      }} 
                              className='py-2 px-4 hover:bg-bg-blue hover:text-blue cursor-pointer'>
                            {status.label}
                        </div>
                  ))
                }
              </div>)
              }
          </div>
        </div>)}
      </div>

      {
        loading 
        ? (
          <div className='flex items-center justify-center min-h-10'>
            <p className='font-bold leading-[150%] text-[18px] text-[#727272] bg-transparent border-none'>Chargement en cours...</p>
          </div>
        ) 
        : (
          handleFilterChange.slice(start, end).map((orderMission, i) => (
            <div key={i} className='my-2'>
              <div className='table-head flex items-stretch justify-between w-full bg-[#F9F9F9] border-[#E4E4E4] rounded-[10px] overflow-hidden cursor-pointer max-md:flex-col max-md:flex-wrap '>
                <div onClick={() => handleMissionControlsCollaps(i)} className='table-base-header p-3 basis-9 w-full bg-[#F9F9F9] max-md:w-min max-md:!basis-1/2'>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className={`${!collapse[i] ? '-rotate-90' : ''} transition-transform`}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
                </div>
                {role !== 'CADRE' 
                && (<div className='table-base-header p-3 w-full  bg-[#F9F9F9] max-md:basis-auto'>
                  <p className='font-bold leading-[150%] text-[14px] text-[#727272] text-left bg-transparent border-none'>{`${orderMission.cadre_nom} ${orderMission.cadre_prenom}`}</p>
                </div>)}
                <div className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                  <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{orderMission.Destination}</p>
                </div>
                <div className='table-base-header p-3 w-full bg-[#F9F9F9]'>
                  <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{`${orderMission.duration_days} Jours`}</p>
                </div>
                <div className='table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden'>
                  <p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>{orderMission.status}</p>
                </div>
                <div className='table-base-header p-3 w-full bg-[#F9F9F9]  max-md:-order-2  max-md:w-min max-md:!basis-1/2 '>
                  <div className="flex items-center justify-end gap-4 bg-transparent border-none">
                    <button
                      onClick={() => theNavigation('/dashboard/orderMissions/control/add', {state: {id: orderMission.mission_id}})}
                      className=" flex gap-2 px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
                    >
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                      Control
                    </button>
                  </div>
                </div>
              </div>
              
              {
                collapse[i] && (
                  <div key={i} className="form flex items-stretch justify-center h-full">
                    <div  className="w-20 min-h-full bg-transparent border-none flex items-stretch justify-end basis-10"><div className='border-l-[2px] w-[1px] h-[90.9%] py-6 flex justify-center items-center border-[#E4E4E4] rounded-sm'></div></div>
                    <div className="table">
                      {controls.length > 0 
                      && controls .filter((control, i) => orderMission.mission_id === control.mission_id)
                        .map ((control, i) => (
                            <div key={i} className='flex justify-between items-center max-md:flex-wrap'>
                            <span className='w-8 h-[2px] bg-[#E4E4E4]'></span>
                            <div key={i} className="table-rows flex items-center justify-evenly basis-full py-2 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
                              <div  className="table-base-row px-3 w-full bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{`${control.raison_sociale}` || 'Entreprise name'}</p></div>
                              <div  className="table-base-row px-3 w-full bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{`${dateFormat(control.date_visite)}` || 'control name'}</p></div>
                              <div  className="table-base-row px-3 w-full max-lg:hidden bg-transparent border-none"><p className="text-[#727272] rounded bg-transparent border-none">{control.f_observation || 'Oujda angade'}</p></div>
                              <div  className="table-base-row px-3 w-full bg-transparent border-none">
                                <div className={`flex items-center just gap-2 px-2 py-1 w-fit border-none rounded-full ${control.validation === "Non Validé" ? "!bg-[rgba(255,156,156,0.44)]" : "!bg-[rgba(183,255,159,0.44)]"}`}>
                                  <span className={`w-3 h-3 rounded-full ${control.validation === "Non Validé" ? "!bg-[#DC2626]" : "bg-[#259800] "}`}></span>
                                  <p className={`rounded bg-transparent border-none ${control.validation === "Non Validé" ? " text-[#DC2626]" : " text-[#259800]"}`}>{control.validation || 'Non Validé'}</p>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                      )) }
                    </div>
                  </div>
                )
              }
            </div>
            ))
            )
          }

      {(orderMissions.length > 0) &&
        (<div className="navigation flex items-center justify-between my-2">
          <button 
            className='px-3 py-2 flex  bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={prevPage}
          >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
            <p className='max-md:hidden'>Précédente</p>
          </button>
  
          <div className='flex gap-2'>
  
            {
              handlenavigation().map(page => (
                <span key={page} onClick={()=> setCurrentPage(page)} className={`cursor-pointer px-3 py-2 transition-colors ${currentPage === page ? 'bg-bg-blue  text-blue' : 'bg-[#E4E4E4] '} font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`}>{ page }</span>
              ))
            }
  
            </div>
  
          <button 
            className='px-3 py-2 flex bg-[#E4E4E4]  font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors'
            onClick={nextPage}
          >
            <p className="max-md:hidden">Suivante</p>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </div>)
      }
    </div>
  )
}

export default ListControl