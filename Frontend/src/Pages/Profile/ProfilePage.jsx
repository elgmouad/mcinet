import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function ProfilePage() {
  const { user } = useSelector(state => state.auth)
  const [updateUser, setUpdateUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  // console.log("User from state in profile page: ",updateUser)

  const handleUpdateUserProfile = (e) => {
    const {name, value} = e.target
    setUpdateUser(prev => ({
      ...prev,
      [name] : value
    }))
    // console.log('All info are updated')
  }
  const handleSubmitChanges = ()=> {
    setEditMode(!editMode)
  }

  return (
    <div>
      <div className="header">
        <div className="bg-gradientBlue w-full h-40 rounded-[14px]  max-md:hidden"></div>
        <div className='profile-container flex items-center justify-between my-12 max-md:flex-col  max-md:my-4'>
          <div className='flex items-center gap-8  max-md:flex-col'>
            <div className="avatar bg-blue w-32 h-32 rounded-full flex items-center justify-center">
              <h1 className='font-bold text-[52px] text-white'>{user.nom.charAt(0).toUpperCase() || 'A'}</h1>
            </div>

            <div className=' max-md:text-center'>
              <div className="name text-[24px] font-bold">{user.nom.toUpperCase() || "Alex Rawlers"} {user.prenom.toUpperCase()}</div>
              <div className="role font-medium">{user.profile || 'Director'}</div>
              <div className="email font-light tracking-wide">{user.email || 'alex@example.com'}</div>
            </div>

          </div>
          <div className='edit'>
            <button
                type="submit"
                onClick={handleSubmitChanges}
                className="px-3 py-2 bg-bg-blue text-blue font-medium font-poppins text-base rounded-[10px] hover:bg-blue hover:text-white transition-colors"
              >
                {editMode ? "Mettre à jour" : "Modifier"}
              </button>
          </div>
        </div>
      </div>

      <div className="content max-md:flex max-md:flex-wrap">
        <div className="flex gap-6 mb-4 max-md:flex-wrap">
          <div className="flex flex-col flex-1 max-md:flex-wrap">
            <label className="font-medium text-sm mb-1">Nom <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleUpdateUserProfile}
              placeholder="Votre nom..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Prenom <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="prenom"
              value={user.prenom}
              onChange={handleUpdateUserProfile}
              placeholder="Votre prenom..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Nom d'Utilisateur <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUpdateUserProfile}
              placeholder="Votre nom d'utilisateur..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
        </div>

        <div className="flex gap-6 mb-4 max-md:flex-wrap">
          <div className="flex flex-col flex-1 ">
            <label className="font-medium text-sm mb-1">Email <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleUpdateUserProfile}
              placeholder="Votre email..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Numero de telephone <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="phone"
              value={user.Numero_tel}
              onChange={handleUpdateUserProfile}
              placeholder="Nom d'utilisateur..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
        </div>

        <div className="flex gap-6 mb-4 max-md:flex-wrap">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Model <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleUpdateUserProfile}
              placeholder="Model de voiture..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm mb-1">Numero de Matricule <span className='text-[#DC2626]'>{editMode ? '*' : ''}</span></label>
            <input
              type="text"
              name="phone"
              value={user.Numero_tel}
              onChange={handleUpdateUserProfile}
              placeholder="Numero de Matricule ..."
              className="border rounded-lg px-4 py-2 focus:outline-blue"
              required
              disabled={editMode ? false : true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage