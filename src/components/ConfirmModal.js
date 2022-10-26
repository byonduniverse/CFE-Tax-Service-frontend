import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'

const ConfirmModal = (props) => {
  const { title, content, open, setOpen, handleDelete } = props
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="standard" onClick={() => {
          handleDelete()
          handleCancel()
        }}>Delete</Button>
        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
