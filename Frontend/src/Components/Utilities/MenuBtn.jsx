import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function MenuBtn({icon, content, path, subMenu}) {
  console.log(content, subMenu)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const toggleSubMenu = () => {
    if(subMenu) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }    
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-start gap-3'>
        {/* main menu container */}
        <div onClick={toggleSubMenu} className='flex items-center justify-between w-full gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
          {/* menu text */}
          <Link to={path}>
            <div className='flex items-center justify-start gap-2'>
              <span className="icon hover:svg>stroke-blue">{icon}</span>
              <p className='font-poppins font-medium text-[14px] leading-5 '> {content} </p>
            </div>
          </Link>

          {/* arrow of the dropdown */}
          {subMenu &&  (
            <div
              className={` transition-transform ${isSubMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
            </div>
          )}
        </div>

        {/* sub menu */}
        {
          subMenu && isSubMenuOpen && (
            <div className="px-2">
              {
                subMenu.map((e, i) => (
                  <Link key={i} to={e.path} >
                    <div className='flex items-center justify-start gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
                      <span className="icon hover:stroke-blue">{e.icon}</span>
                      <p className='font-poppins font-medium text-[14px] leading-5 '> {e.content} </p>
                    </div>
                  </Link>
                ))
              }
            </div>
          )
        }
      </div>

    </div>
  )
}

export default MenuBtn

// main menu 
{/* <div className='flex flex-col items-center justify-start gap-3'>
    <Link to={link.path}>
        <div onClick={() => toggleSubMenu(link)} className='flex items-center justify-between w-full gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
            <div className='flex items-center justify-start gap-2'>
                <span className="icon hover:svg>stroke-blue">{link.icon}</span>
                <p className='font-poppins font-medium text-[14px] leading-5 '> {link.content} </p>
            </div>

            {link.subMenu && (
                <div className={` transition-transform ${submenuState[link.content] ? 'rotate-90' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-blue cursor-pointer icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </div>
            )}
        </div>
    </Link>
</div> */}

// sub Menu
{/* <div className="px-2">{
  link.subMenu.map((sub, i) => (
      (<Link key={i} to={sub.path} >
          <div className='flex items-center justify-start gap-3 px-8 h-11 rounded-[10px] transition-colors hover:bg-bg-blue hover:text-blue cursor-pointer'>
              <span className="icon hover:stroke-blue">{sub.icon}</span>
              <p className='font-poppins font-medium text-[14px] leading-5 '> {sub.content} </p>
          </div>
      </Link>)
  ))
}</div> */}