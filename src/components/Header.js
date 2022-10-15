import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

const Navbar = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  color: white;
  margin-right: 15px;
`

const Header = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ height: '60px', backgroundColor: 'primary.main' }} color='white'>
      <Container maxWidth="lg" sx={{ height: '100%', display: 'flex' }}>
        <Navbar sx={{ fontSize: '25px' }} to='#'>
          TAX SERVICE
        </Navbar>
        <Box sx={{ marginLeft: 'auto', height: '100%', display: 'flex' }}>
          {localStorage.getItem('token') ? (
            <p className="pointer-cursor" onClick={() => {
              localStorage.removeItem('token')
              navigate('../login')
            }}>Logout</p>
          ) : (
            <>
              <Navbar to="/login">Login</Navbar>
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default Header
