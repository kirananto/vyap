import axios from "axios"

export const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:3333' : `https://api.vyap.app/do`

// export const baseURL =  `http://localhost:3333`

export const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })