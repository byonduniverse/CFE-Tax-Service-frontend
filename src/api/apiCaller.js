import axios from 'axios'

import { BASE_URL } from '../config'

export const login = (user) => axios.post(`${BASE_URL}/auth/login`, user)
export const clients = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${BASE_URL}/users`, { header: { "Authorization": `Bearer ${token}` } })
}
