import axios from "axios"

//@ts-ignore
export const baseURL = __SNOWPACK_ENV__.MODE === 'development' ?`http://localhost:3333/api` : `https://vyap-backend-vve8g.ondigitalocean.app/do/api`

export const axiosClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  })