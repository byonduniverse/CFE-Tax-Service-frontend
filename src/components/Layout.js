import React from 'react'
import { Container, Box } from '@mui/material'

import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: '#ddd' }}>
      <Header></Header>
      <Container maxWidth="xl" sx={{ height: '100%', paddingLeft: '0px', backgroundColor: 'white', display: 'flex' }}>
        <Sidebar />
        <Box sx={{ padding: '30px', width: '100%' }}>{children}</Box>
      </Container>
    </Box>
  )
}

export default Layout
