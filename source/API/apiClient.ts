import axios from "axios"

export const baseURL = import.meta.env.SNOWPACK_PUBLIC_API_URL ?? `https://vyap-backend-kiw4p.ondigitalocean.app/do`

export const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })