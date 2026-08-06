import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:3333',
  // baseURL: 'https://my-money-manager-api-production.up.railway.app',
  baseURL: 'https://my-money-manager-api.onrender.com',
  withCredentials: false,
})
