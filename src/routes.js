import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './containers/Login'

const AuthRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

const UserRouter = () => {
  return <></>
}

const Router = () => {
  const token = localStorage.getItem('token')
  return token ? <UserRouter /> : <AuthRouter />
}

export default Router
