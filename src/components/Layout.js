import React, { useContext } from 'react'
import { Container, Box } from '@mui/material'

import Header from './Header'
import Sidebar from './Sidebar'
import { CurrentUserContext } from '../contexts/currentUser'

const Layout = ({ children }) => {
  const value = useContext(CurrentUserContext)

  return (
    <Box sx={{ backgroundColor: '#ddd' }}>
      <Header></Header>
      <Container maxWidth="xl" sx={{ height: '100%', paddingLeft: '0px', backgroundColor: 'white', display: 'flex' }}>
        {value?.currentUser && localStorage.getItem('token') && <Sidebar />}
        <Box sx={{ padding: '30px', width: '100%' }}>{children}</Box>
      </Container>
    </Box>
  )
}

export default Layout
