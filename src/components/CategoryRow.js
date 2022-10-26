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
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import download from 'downloadjs'

import InfoModal from './InfoModal'
import { BASE_URL } from '../config'
import RenameFolderModal from './RenameFolderModal'
import { deleteCategory } from '../api/apiCaller'
import ConfirmModal from './ConfirmModal'

const FileCell = styled(TableCell)`
  max-width: 150px;
`

const formatText = (str) => {
  if (str.length < 25) {
    return str
  } else {
    return str.substring(0, 20) + '...'
  }
}

const CategoryRow = (props) => {
  const { row, setUploadOpen, flag, setFlag } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [fileInfo, setFileInfo] = useState({})
  const [currentRow, setRow] = useState(0)
  const [categoryEl, setCategoryEl] = useState(null)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmType, setConfirmType] = useState('')
  const openAction = Boolean(anchorEl)
  const actions = [
    {
      key: 'Rename',
      click: () => {
        setCategoryOpen(true)
        handleCategoryClose()
      }
    },
    {
      key: 'Delete',
      click: () => {
        setConfirmOpen(true)
        setConfirmType('category')
        handleCategoryClose()
      }
    }
  ]
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
      click: () => {
        setConfirmOpen(true)
        setConfirmType('file')
        handleClose()
      }
    },
  ]

  const handleClose = () => setAnchorEl(null)
  const handleClick = (event, index) => {
    setRow(index)
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = () => {
    deleteCategory(row).then(() => {
      setFlag(!flag)
    }).catch(err => {
      toast.error(err.error)
    })
  }

  const handleCategoryAction = (event) => {
    setCategoryEl(event.currentTarget)
  }
  const handleCategoryClose = () => setCategoryEl(null)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          {row?.name}
        </TableCell>
        <TableCell align="center">
          {row?.files?.length || '0'}
        </TableCell>
        <TableCell>
          <IconButton
            id="category"
            aria-label="category"
            aria-controls={categoryOpen ? 'category_action' : undefined}
            aria-haspopup={true}
            aria-expanded={categoryOpen ? 'true' : undefined}
            onClick={(event) => handleCategoryAction(event)}
          >
            <MoreVert />
          </IconButton>
          {
            <Menu id="category_action" open={Boolean(categoryEl)} onClose={handleCategoryClose} anchorEl={categoryEl} MenuListProps={{
              'aria-labelledby': 'action'
            }}>
              {
                actions.map(action => (
                  <MenuItem
                    key={action.key}
                    onClick={action.click}
                  >
                    {action.key}
                  </MenuItem>
                ))
              }
            </Menu>
          }
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
                    <FileCell>Name</FileCell>
                    <FileCell align="center">Type</FileCell>
                    <FileCell align="center">Size</FileCell>
                    <FileCell align="center">Date</FileCell>
                    <FileCell align="center">Action</FileCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row && row.files && row.files.map(((file, fileIndex) => (
                    <TableRow key={file._id}>
                      <FileCell component="th" scope="row" align="left">
                        {formatText(file.name)}
                      </FileCell>
                      <FileCell align="center">
                        {file.type}
                      </FileCell>
                      <FileCell align="right">
                        {file.size}
                      </FileCell>
                      <FileCell align="center">
                        {file.downloaded_at}
                      </FileCell>
                      <FileCell align="center">
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
                      </FileCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <ConfirmModal open={confirmOpen} setOpen={setConfirmOpen} title="Delete" content={`Do you want to delete a ${confirmType}?`} handleDelete={handleDelete} />
      <InfoModal open={infoOpen} setOpen={setInfoOpen} file={fileInfo}></InfoModal>
      <RenameFolderModal open={categoryOpen} setOpen={setCategoryOpen} category={{ _id: row._id, name: row.name }} />
    </>
  )
}

export default CategoryRow
