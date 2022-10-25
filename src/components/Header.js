import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CurrentUserContext } from '../contexts/currentUser'

const Navbar = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  margin-right: 15px;
`

const Header = () => {
  const navigate = useNavigate()
  const value = useContext(CurrentUserContext)

  return (
    <Box sx={{ height: '60px', backgroundColor: 'primary.dark' }} color='white'>
      <Container maxWidth="xl" sx={{ height: '100%', display: 'flex' }}>
        <Navbar sx={{ fontSize: '25px', pointer: 'cursor', textDecoration: 'auto' }} to='#'>
          CFE TAX SERVICES
        </Navbar>
        <Box sx={{ marginLeft: 'auto', height: '100%', display: 'flex', cursor: 'pointer' }}>
          {localStorage.getItem('token') ? (
            <p className="pointer-cursor" onClick={() => {
              localStorage.removeItem('token')
              value.createCurrentUser({})
              navigate('/login')
            }}>Logout</p>
          ) : (
            <>
              <Navbar to="/login" sx={{ cursor: 'pointer' }}>Login</Navbar>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
