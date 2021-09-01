import axios from "axios"

export const baseURL = `https://vyap-backend-vve8g.ondigitalocean.app/do/api`

export const axiosClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })