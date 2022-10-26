import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Dialog,
  Button,
  Box,
  DialogTitle,
  TextField,
} from '@mui/material'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { CategoriesContext } from '../contexts/categories'
import { updateCategory } from '../api/apiCaller'

const validationSchema = yup.object({
  name: yup.string().required('Folder name is required'),
})

const RenameFolderModal = (props) => {
  const { open, setOpen, category } = props
  const owner = useParams().id || ''
  const initValues = category
  const value = useContext(CategoriesContext)

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const changedCategory = values
      if (owner) Object.assign(changedCategory, { owner, _id: category._id })
      updateCategory(changedCategory)
        .then(category => {
          value.updateCategory(category)
        })
        .catch(err => {
          toast.error(err.error)
        })
      handleCancel()
    }
  })

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>Rename folder</DialogTitle>
      <Box sx={{ minWidth: '200px', padding: '20px' }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="name"
            label="Folder name"
            variant="standard"
            value={formik.values.name}
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
          />
          <Box variant="standard" sx={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Button type="submit" variant="contained" sx={{
              maxWidth: '100px', marginRight: '20px', width: 'auto'
            }}>Save</Button>
            < Button variant="outlined" sx={{ maxWidth: '100px', width: 'auto' }} onClick={handleCancel}>Cancel</Button>
          </Box>
        </form>
      </Box>
    </Dialog >
  )
}

export default RenameFolderModal
