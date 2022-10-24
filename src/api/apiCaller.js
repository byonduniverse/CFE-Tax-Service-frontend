import axios from 'axios'

import { BASE_URL } from '../config'

export const login = (user) => axios.post(`${BASE_URL}/auth/login`, user)
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  return axios.get(`${BASE_URL}/auth/currentuser`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getClients = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${BASE_URL}/users`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getCategories = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${BASE_URL}/categories`, { headers: { "Authorization": `Bearer ${token}` } })
}
export const getFiles = (id) => {
  const token = localStorage.getItem('token')
  return axios.get(`${BASE_URL}/files/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}
