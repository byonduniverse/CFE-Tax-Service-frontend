import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './containers/Login'
import Clients from './containers/Clients'
import Files from './containers/Files'
import { CurrentUserContext } from './contexts/currentUser'
import { CategoriesProvider } from './contexts/categories'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

const UserRouter = () => {
  return (
    <CategoriesProvider>
      <Routes>
        <Route path="/clients" element={<Clients />} />
        <Route path="/files/:id" element={<Files />} />
        <Route path="/files" element={<Files />} />
        <Route path="/" element={<Clients />} />
      </Routes>
    </CategoriesProvider>
  )
}

const Router = () => {
  const token = localStorage.getItem('token')
  const value = useContext(CurrentUserContext)

  return token && value?.currentUser ? <UserRouter /> : <AuthRouter />
}

export default Router
