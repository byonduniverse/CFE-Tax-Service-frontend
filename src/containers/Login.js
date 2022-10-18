import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, Grid, Divider, TextField, Button, Typography } from '@mui/material'
import { ExitToApp, CloudDownload, CloudUpload } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { login } from '../api/apiCaller'

const AuthInput = styled(TextField)`
  display: flex;
  padding: 20px;
  width: 100%;
`

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'Too short').required('Password is reuqired'),
})

const Login = () => {
  const navigate = useNavigate()
  const initValues = { username: '', password: '' }
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { username, password } = values
      login({
        username,
        password,
      }).then((user) => {
        const { token } = user.data
        localStorage.setItem('token', token.token)
        if (token) {
          toast.success('Login is successful.')
          if (user.data.data.role === 'admin') {
            navigate('../clients')
          } else {
            navigate('../files')
          }
        }
      }).catch((err) => {
        toast.error(err.error)
      })
    }
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <Card sx={{ display: 'flex', padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item md>
            <Box sx={{ minWidth: '200px', maxWidth: '300px', padding: "20px" }}>
              <form onSubmit={formik.handleSubmit}>
                <Typography variant="h5" sx={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>Login</Typography>
                <AuthInput id="username" type="text" label="username" variant="standard" onChange={formik.handleChange}></AuthInput>
                <AuthInput id="password" type="password" label="password" variant="standard" onChange={formik.handleChange}></AuthInput>
                <Button fullWidth variant="contained" type="submit" sx={{ marginTop: 3 }} onClick={() => { }}>
                  <ExitToApp sx={{ marginRight: 1 }} />
                  Login
                </Button>
              </form>
            </Box>
          </Grid>
          <Divider orientation="vertical" sx={{ padding: '10px' }} flexItem></Divider>
          <Grid item md>
            <Box sx={{ minWidth: '200px', maxWidth: '300px', padding: '20px' }}>
              <Typography variant="h5" sx={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>Guest Exchange</Typography>
              <Typography variant="p" sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', width: '100%' }}>Don't have an account? Upload or Download files here.</Typography>
              <Button fullWidth variant="contained" type="button" sx={{ marginTop: 3 }} onClick={() => { }}>
                <CloudDownload sx={{ marginRight: 1 }} />
                Download
              </Button>
              <Button fullWidth variant="contained" type="button" sx={{ marginTop: 3 }} onClick={() => { }}>
                <CloudUpload sx={{ marginRight: 1 }} />
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box >
  )
}

export default Login
