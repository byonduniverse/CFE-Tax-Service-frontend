import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import MessageIcon from '@mui/icons-material/Message'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

import { CurrentUserContext } from '../contexts/currentUser'

const Sidebar = () => {
  const navigate = useNavigate()
  const sides = [
    {
      name: 'Files',
      url: '/files',
    },
    {
      name: 'Messenger',
      url: '/messenger',
    },
  ]
  const value = useContext(CurrentUserContext)
  if (value && value.currentUser && value.currentUser.role === 'admin') {
    sides.unshift({ name: 'Clients', url: '/clients' })
  } else if (!value.currentUser || !localStorage.getItem('token')) {
    return <></>
  }

  return (
    <Box
      sx={{
        width: '250px',
        height: window.innerHeight - 76,
        backgroundColor: 'primary.main',
        padding: '0px',
      }}
      role='presentation'
    >
      <List>
        {sides.map((side) => (
          <ListItem
            key={side.name}
            sx={{ paddingLeft: '0px', paddingRight: '0px' }}
            onClick={() => {
              navigate(side.url)
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ marginLeft: '10px' }} on>
                {side.name === 'Clients' ? (
                  <PeopleAltIcon sx={{ color: 'white' }} />
                ) : side.name === 'Files' ? (
                  <InsertDriveFileIcon sx={{ color: 'white' }} />
                ) : (
                  <MessageIcon sx={{ color: 'white' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={side.name}
                sx={{ color: 'white' }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
