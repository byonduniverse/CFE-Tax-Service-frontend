import React, { useState } from 'react'
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import { MoreVert, KeyboardArrowDown, KeyboardArrowUp, NoteAdd } from '@mui/icons-material'
import download from 'downloadjs'

import InfoModal from './InfoModal'
import { BASE_URL } from '../config'

const CategoryRow = (props) => {
  const { row, setUploadOpen } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [fileInfo, setFileInfo] = useState({})
  const [currentRow, setRow] = useState(0)
  const openAction = Boolean(anchorEl)
  const options = [
    {
      key: 'Info',
      click: (file) => {
        setFileInfo(file)
        setInfoOpen(true)
        handleClose()
      }
    },
    {
      key: 'Rename',
      click: () => { }
    },
    {
      key: 'Download',
      click: async (file) => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/files/download/${file.name}`, { headers: { "Authorization": `Bearer ${token}` } })
        const blob = await res.blob()
        download(blob, file.name)
      }
    },
    {
      key: 'Delete',
      click: () => { }
    },
  ]

  const handleClose = () => setAnchorEl(null)
  const handleClick = (event, index) => {
    setRow(index)
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {row.name}
        </TableCell>
        <TableCell>
          {row.files.length || '0'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: '0px', paddingTop: '0px' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom component="div">
                  Files
                </Typography>
                <IconButton onClick={() => setUploadOpen(true)}><NoteAdd /></IconButton>
              </Box>
              <Table size="small" aria-label="files">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row && row.files && row.files.map(((file, fileIndex) => (
                    <TableRow key={file._id}>
                      <TableCell component="th" scope="row">
                        {file.name}
                      </TableCell>
                      <TableCell>
                        {file.type}
                      </TableCell>
                      <TableCell>
                        {file.size}
                      </TableCell>
                      <TableCell>
                        {file.downloaded_at}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          id="action"
                          aria-label="action"
                          aria-controls={open ? 'file_action' : undefined}
                          aria-haspopup={true}
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(event) => handleClick(event, fileIndex)}
                        >
                          <MoreVert />
                        </IconButton>
                        {
                          fileIndex === currentRow && <Menu id="file_action" open={openAction} onClose={handleClose} anchorEl={anchorEl} MenuListProps={{
                            'aria-labelledby': 'action'
                          }}>
                            {
                              options.map(option => (
                                <MenuItem
                                  key={option.key}
                                  onClick={() => option.click(file)}
                                >
                                  {option.key}
                                </MenuItem>
                              ))
                            }
                          </Menu>
                        }
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <InfoModal open={infoOpen} setOpen={setInfoOpen} file={fileInfo}></InfoModal>
    </>
  )
}

export default CategoryRow
