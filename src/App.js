import React, { useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Router from './routes'
import { getCurrentUser } from './api/apiCaller'
import { CurrentUserContext } from './contexts/currentUser'

const App = () => {
  const token = localStorage.getItem('token')
  const value = useContext(CurrentUserContext)
  useEffect(() => {
    if (token) {
      getCurrentUser(token).then(user => {
        value.createCurrentUser(user.data.user)
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
