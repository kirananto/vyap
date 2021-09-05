import axios from "axios"

export const baseURL = process.env.SNOWPACK_PUBLIC_API_URL ?? `http://localhost:3333`

export const axiosClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })