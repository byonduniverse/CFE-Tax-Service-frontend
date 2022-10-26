import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Router from './routes'
import { CurrentUserProvider } from './contexts/currentUser'

const App = () => {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <Layout>
          <Router />
        </Layout>
      </CurrentUserProvider>
    </BrowserRouter>
  )
}

export default App
