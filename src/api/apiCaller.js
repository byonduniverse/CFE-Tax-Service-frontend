import axios from 'axios'

export const login = async (user) => {
  await axios.post(`http://localhost:4000/api/login`, user)
}
