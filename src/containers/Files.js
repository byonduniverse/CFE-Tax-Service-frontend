import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Grid,
  Paper,
  Button,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  tableCellClasses,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { CreateNewFolder, FileUpload } from '@mui/icons-material'

import CategoryRow from '../components/CategoryRow'
import FileUploadModal from '../components/FileUploadModal'
import AddFolderModal from '../components/AddFolderModal'
import { CurrentUserContext } from '../contexts/currentUser'
import { CategoriesContext } from '../contexts/categories'
import { getCategories } from '../api/apiCaller'
import { toast } from 'react-toastify'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const Files = (req) => {
  const value = useContext(CurrentUserContext)
  const categoryValue = useContext(CategoriesContext)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [addFolder, setAddFolder] = useState(false)
  const [flag, setFlag] = useState(false)
  const [current, setCurrent] = useState()
  let id = useParams().id || ''

  if ((value?.currentUser?.role !== 'admin') || !id) {
    id = value?.currentUser?._id
  }

  useEffect(() => {
    getCategories(id).then(data => {
      categoryValue.setFiles(data?.data?.categories)
      const list = data?.data?.categories.map(category => { return { _id: category._id, name: category.name } })
      categoryValue.setCategories(list)
    }).catch(err => {
      toast.error(err.error)
    })
  }, [flag])

  return (
    <Box sx={{ width: '100%', overflow: 1, marginTop: '50px' }}>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={{ marginBottom: '20px' }} startIcon={<CreateNewFolder />} onClick={() => setAddFolder(true)}>
              Add Folder
            </Button>
            <Button variant="outlined" sx={{ marginBottom: '20px' }} startIcon={<FileUpload />} onClick={() => setUploadOpen(true)}>
              Upload
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ height: window.innerHeight - 230, overflowY: 'auto' }}>
            <Table stickyHeader aria-label="from download">
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell>Folder name</StyledTableCell>
                  <StyledTableCell align='center'>Number of files</StyledTableCell>
                  <StyledTableCell align='center'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  categoryValue?.files?.map(file => (
                    <CategoryRow key={file._id} row={file} uploadOpen={uploadOpen} setUploadOpen={setUploadOpen} flag={flag} setFlag={setFlag} />
                  ))
                }
              </TableBody>
            </Table>
            {
              !categoryValue?.files?.length && <Typography sx={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>There aren't any folders.</Typography>
            }
          </TableContainer>
        </Grid>
      </Grid>
      <FileUploadModal open={uploadOpen} setOpen={setUploadOpen} current={current} setCurrent={setCurrent} categories={categoryValue?.categories} />
      <AddFolderModal open={addFolder} setOpen={setAddFolder} />
    </Box>
  )
}

export default Files
