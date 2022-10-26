import React from 'react'
import {
  Modal,
  Fade,
  Box,
  Typography,
  Grid,
  Backdrop,
  Button,
} from '@mui/material'

const style = {
  padding: '20px',
  position: 'absolute',
  left: window.innerWidth / 2 - 200,
  top: window.innerHeight / 2 - 150,
  width: '450px',
  'border-radius': '10px',
  bgcolor: 'background.paper',
  boxshawdow: '0px 2px 10px 5px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important;'
}

const InfoModal = (props) => {
  const { open, setOpen, file } = props
  const info = [{
    label: 'File Name',
    value: file.name,
  },
  {
    label: 'File Type',
    value: file.type,
  },
  {
    label: 'Size',
    value: file.size,
  },
  {
    label: 'Upload Date',
    value: file.uploaded_at,
  },
  {
    label: 'Download Date',
    value: file.downloaded_at,
  },
  {
    label: 'Expiration Date',
    value: file.expiration_at,
  }]

  return (
    <Modal aria-labelledby="info-modal-title" open={open} onClose={() => setOpen(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{
      timeout: 500,
    }}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="info-modal-title" sx={{ marginBottom: '30px' }} variant="h5" component="h2">
            Detail
          </Typography>
          {
            info.map(data => (
              <Grid container key={data.label} spacing={2} sx={{ display: 'flex', padding: '5px' }}>
                <Grid item xs={5}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px', alignItem: 'center' }}>
                    {data.label}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ fontSize: '18px', alignItem: 'center' }}>
                    {data.value}
                  </Typography>
                </Grid>
              </Grid>
            ))
          }
          <Button sx={{ float: 'right' }} onClick={() => setOpen(false)}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  )
}

export default InfoModal
