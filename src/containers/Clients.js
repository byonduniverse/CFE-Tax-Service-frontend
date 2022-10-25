import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  tableCellClasses
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

import { CurrentUserContext } from '../contexts/currentUser'
import { getClients } from '../api/apiCaller'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const columns = [
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'username', label: 'Username', minWidth: 100, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 100, align: 'center' },
  { id: 'activated', label: 'Activated', minWidth: 50, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
]

const Clients = () => {
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const value = useContext(CurrentUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (value?.currentUser?.role !== 'admin') {
      navigate('/files')
    } else {
      getClients().then((data) => {
        setUsers(data.data.users)
      })
    }
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '50px' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {
                columns && columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow hover xs={{ cursor: 'pointer' }} role="checkbox" tabIndex={-1} key={user._id} onClick={() => {
                      navigate(`/files/${user._id}`)
                    }}>
                      {columns.map((column) => {
                        const values = {
                          name: user.firstname + ' ' + user.lastname,
                          username: user.username,
                          email: user.email,
                          activated: user.activated ? 'Yes' : 'No'
                        }
                        if (column.id !== 'actions') {
                          return (
                            <StyledTableCell key={column.id} align={column.align}>
                              {values[column.id]}
                            </StyledTableCell>
                          )
                        } else {
                          return (
                            <StyledTableCell key={column.id} align={column.align}>
                              <IconButton aria-label="edit">
                                <Edit />
                              </IconButton>
                              <IconButton aria-label="delete">
                                <Delete />
                              </IconButton>
                            </StyledTableCell>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Clients
