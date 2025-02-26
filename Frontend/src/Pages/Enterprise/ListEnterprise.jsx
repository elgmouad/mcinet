import React, { useState, useEffect, useRef } from 'react'
// import { useOnClickOutside } from '../../Hooks/useOnClickOutside'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchEnterprise } from '../../Redux/Actions/enterprise.actions';
import HeadeContent from '../../Components/Utilities/HeadeContent';

function ListEnterprise( {role} ) {
    const theNavigate = useNavigate()
    const dispatch = useDispatch()
    const {enterprises, loading, error} = useSelector(state => state.enterprise)
    console.log("List entreprise: ", enterprises)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4
    const totalPage = (Math.ceil(enterprises.length / itemsPerPage));
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage
    const showMaxBtn = 3
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

    useEffect( ()=> {
        dispatch(fetchEnterprise())
    }, [dispatch])
    
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

    const handleDetails = (enterpriseICE) => {
        theNavigate('/dashboard/entreprise/add', {
            state: {
                data: enterprises.find(ent => ent.ICE === enterpriseICE),
                isEdit: true
            }
        })
    }

    return (
        <div className='flex flex-col gap-8 mb-4'>
            {/* <div className="header flex items-center justify-between">
                <h1 className='font-poppins font-bold text-3xl'>List des Entreprise</h1>
            </div> */}
            <HeadeContent role={role} dateObject={enterprises} currentPage={'Entreprise'} to={'/dashboard/entreprise/add'} filter={false} />
            <div className="form flex items-start justify-center h-full">
                <div className="table">
                    <div className="table-head flex items-center justify-evenly w-full border-[#E4E4E4] rounded-[10px] overflow-hidden">
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>ICE</p></div>
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none '>RS</p></div>
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Province/Prefecture</p></div>
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Adresse</p></div>
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9] max-md:hidden"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Telephone</p></div>
                        <div className="table-base-header p-3 w-full bg-[#F9F9F9]"><p className='font-bold leading-[150%] text-[14px] text-[#727272] bg-transparent border-none'>Secteur</p></div>
                    </div>


                    {loading ? (
                        <div className="text-center py-4">Chargement...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : enterprises.length > 0 ? enterprises.slice(start, end).map((item, i) => (
                        <div key={i} onClick={() => handleDetails(item.ICE)} className="table-rows flex items-center justify-evenly py-3 my-2 border border-[#E4E4E4] rounded-[10px] cursor-pointer transition-colors hover:bg-[#F9F9F9] hover:!border-[#E4E4E4]">
                            <div className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{item.ICE || 'ICE'}</p></div>
                            <div className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{`${item.raison_sociale}` || 'item name'}</p></div>
                            <div className="table-base-row px-3 w-full max-md:hidden"><p className="text-[#727272] rounded bg-transparent border-none">{`${item.province_prefecture}` || 'ATP'}</p></div>
                            <div className="table-base-row px-3 w-full max-md:hidden"><p className="text-[#727272] rounded bg-transparent border-none">{item.adresse_siege || 'Oujda angade'}</p></div>
                            <div className="table-base-row px-3 w-full max-md:hidden"><p className="text-[#727272] rounded bg-transparent border-none">{item.telephone || 'Aucun'}</p></div>
                            <div className="table-base-row px-3 w-full"><p className="text-[#727272] rounded bg-transparent border-none">{item.secteur_entreprise || 'Avtivité'}</p></div>
                        </div>
                    )) : (
                        <div className='flex flex-col items-center justify-center px-3 w-full text-center font-medium my-10'>
                            <div>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-[#969696] w-24 h-24 border-none icon icon-tabler icons-tabler-outline icon-tabler-building-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21h18" /><path d="M9 12h1" /><path d="M9 16h1" /><path d="M14 8h1" /><path d="M14 16h1" /><path d="M5 21v-16" /><path d="M7 3h10c1 0 2 1 2 2v10" /><path d="M19 19v2" /><path d="M3 3l18 18" /></svg>
                            </div>
                            <p className='text-[#969696]'>Aucune entreprise trouver</p>
                        </div>
                    )}
                </div>
            </div>

            {(enterprises.length > 0 && totalPage > 1 ) &&
                (<div className="navigation flex items-center justify-between ">
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
                                <span key={page} onClick={() => setCurrentPage(page)} className={`cursor-pointer px-3 py-2 transition-colors ${currentPage === page ? 'bg-bg-blue  text-blue' : 'bg-[#E4E4E4] '} font-medium font-poppins text-base rounded-[10px] hover:!bg-bg-blue hover:text-blue  transition-colors`}>{page}</span>
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

export default (ListEnterprise)