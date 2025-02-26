import React from 'react'

function Btn({content, type}) {
  return (
    <button className='w-full h-[49px] bg-bg-blue text-blue font-medium font-poppins text-xl rounded-[10px]' type={type}>{content}</button>
  )
}

export default Btn