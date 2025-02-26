import React, {useState, useRef} from 'react'
import { useOnClickOutside } from '../../Hooks/useOnClickOutside';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function HeadeContent({role, currentPage, ...rest}) {
    const navigate = useNavigate();

    console.log("Filter:", rest.filter)
    
    const missionMenuRef = useRef()
        const modalRef = useRef();
        useOnClickOutside(missionMenuRef, () => setOpenMissionMenu(null))
        useOnClickOutside(modalRef, () => setModalPopUpPrint(false))
    const handleFilterChange = rest.dateObject.filter((mission) => {
        if (!rest.filter || rest.filter === 'Tous') return true;
        return mission.status === filter
    })
    let filterMenuRef = useRef()
    useOnClickOutside(filterMenuRef, () => setFilterMenuOpen(false) )

  return (
    <div className="header flex items-center justify-between flex-wrap">
        <h1 className={`font-poppins font-bold text-3xl mb-8 ${role === 'CADRE' ? 'basis-full' : ''}`}>List des {currentPage}</h1>
        {role !== 'CADRE' && 
        (<div className="flex items-center justify-end gap-4">
          <button
            onClick={() => navigate(to)}
            className=" flex gap-2 px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
          >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
            {currentPage}
          </button>
        </div>)}
        <div className='basis-full'>
          <div className='searchBox flex justify-center items-center w-[334px] h-[38px] px-3 rounded-[10px] border-border border focus-within:border-blue overflow-hidden max-md:basis-full max-md:justify-center max-md:w-full'>
              <span className=''>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="#B6B6B6"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="hover:stroke-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              </span>
              <input type="text" placeholder={`Chercher par ${currentPage}`} className='w-full h-full bg-transparent outline-none ml-2'/>
          </div>
        </div>
        {/* filter menu */}
        {role !== "CADRE" 
        &&  rest.filter === true ? (<div className="filter flex items-center justify-end basis-1/2 gap-4 my-2" >
          <p className='font-medium text-base'>Trier par: </p>

          <div className='flex items-center justify-between gap-2 relative' ref={filterMenuRef}>
            <span value="cadre" className='bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors'>Cadres</span>
            <span value="status" onClick={() => setFilterMenuOpen(!rest.isFilterMenuOpen)} className={`relative bg-[#E4E4E4] font-semibold rounded-[10px] py-2 px-3 hover:bg-bg-blue hover:text-blue cursor-pointer transition-colors ${rest.isFilterMenuOpen ? 'bg-bg-blue' : ''}`}>
                <div className={`flex items-center justify-center ${rest.isFilterMenuOpen ? 'text-blue' : ''}`}>
                  <span>Statue: { rest.filter || 'Tous'}</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`hover:text-blue ${rest.isFilterMenuOpen ? 'rotate-90' : ''} cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right`}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                  </span>
                </div>
            </span>
              { rest.isFilterMenuOpen &&
                (<div className='absolute top-12 right-0 z-50 bg-[#E4E4E4] rounded-[10px] overflow-hidden'>
                {
                  rest.filter.map(status => (
                        <div key={status.id} onClick={() => {
                                      setFilter(status.label)
                                      setFilterMenuOpen(false)
                                    //   console.log(filter)
                                      }} 
                              className='py-2 px-4 hover:bg-bg-blue hover:text-blue cursor-pointer'>
                            {status.label}
                        </div>
                  ))
                }
              </div>)
              }
          </div>
        </div>)
        : ('')}
      </div>
  )
}

export default HeadeContent