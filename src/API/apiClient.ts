import axios from "axios"

export const baseURL = import.meta.env.MODE === 'development' ? 'https://api.vyap.app' : `https://api.vyap.app`
// export const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:3333' : `https://api.vyap.app`

export const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })