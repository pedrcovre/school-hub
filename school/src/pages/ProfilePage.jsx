import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth()
  const [imagePreview, setImagePreview] = useState(null)
  const [profileImageFile, setProfileImageFile] = useState(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const fileInputRef = useRef(null)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  if (!user) {
    return <p>Carregando perfil...</p>
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setProfileImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (newPassword && newPassword !== confirmPassword) {
      alert('A nova senha e a confirmação não correspondem!')
      return
    }
    const updates = {}
    if (profileImageFile) updates.profileImage = profileImageFile
    if (newPassword && currentPassword) {
      updates.currentPassword = currentPassword
      updates.newPassword = newPassword
    }

    if (Object.keys(updates).length === 0) {
      alert('Nenhuma alteração para salvar.')
      return
    }

    try {
      await updateUserProfile(updates)
      alert('Perfil atualizado com sucesso!')
      setNewPassword('')
      setCurrentPassword('')
      setConfirmPassword('')
      setProfileImageFile(null)
      setImagePreview(null)
    } catch (error) {
      alert(`Erro ao atualizar o perfil: ${error.message}`)
    }
  }

  const getAvatarSrc = avatarPath => {
    if (imagePreview) {
      return imagePreview
    }
    if (!avatarPath) {
      return 'https://placehold.co/150x150/E2E8F0/4A5568?text=Sem+Foto'
    }
    if (avatarPath.startsWith('http')) {
      return avatarPath
    }
    const correctedPath = avatarPath.replace(/\\/g, '/')
    return `${API_URL}/${correctedPath}`
  }

  const inputClassName =
    'block w-full rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-gray-500 sm:text-sm text-base py-2 px-3 focus:outline-none'

  return (
    <div className='container mx-auto p-4'>
      <div className='max-w-xl mx-auto bg-white rounded-lg shadow-md p-4'>
        <h1 className='text-xl font-bold mb-4 text-gray-800'>Meu Perfil</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex items-center mb-4'>
            <img
              src={getAvatarSrc(user.avatarUrl)}
              alt='Avatar'
              className='w-20 h-20 rounded-full object-cover mr-4'
            />
            <div>
              <button
                type='button'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
                onClick={() => fileInputRef.current.click()}
              >
                Alterar Foto
              </button>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleImageChange}
                className='hidden'
                accept='image/png, image/jpeg'
              />
              <p className='text-xs text-gray-500 mt-2'>PNG ou JPG.</p>
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>
              Nome
            </label>
            <input
              type='text'
              value={user.name || ''}
              disabled
              className='block w-full bg-gray-200 rounded-lg border border-gray-300 sm:text-sm text-base py-2 px-3 cursor-not-allowed'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>
              Email
            </label>
            <input
              type='email'
              value={user.email || ''}
              disabled
              className='block w-full bg-gray-200 rounded-lg border border-gray-300 sm:text-sm text-base py-2 px-3 cursor-not-allowed'
            />
          </div>
          <div className='border-t border-gray-200 my-4'></div>
          <h2 className='text-lg font-semibold mb-3 text-gray-800'>
            Alterar Senha
          </h2>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>
              Senha Atual
            </label>
            <input
              type='password'
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder='********'
              className={inputClassName}
            />
          </div>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>
              Nova Senha
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder='********'
              className={inputClassName}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-1'>
              Confirmar Nova Senha
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder='********'
              className={inputClassName}
            />
          </div>
          <div className='flex justify-end mt-4'>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
