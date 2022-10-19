import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './containers/Login'
import Clients from './containers/Clients'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/clients" element={<Clients />} />
    </Routes>
  )
}

const Router = () => {
  const token = localStorage.getItem('token')
  return token ? <UserRouter /> : <AuthRouter />
}

export default Router
