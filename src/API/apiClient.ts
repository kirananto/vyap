import axios from "axios"

export const baseURL = `https://vyap-backend-kiw4p.ondigitalocean.app/do`

// export const baseURL =  `http://localhost:3333`

export const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })