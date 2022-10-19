import React from 'react'
import { Container } from '@mui/material'

import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <div>{children}</div>
      </Container>
    </>
  )
}

export default Layout
