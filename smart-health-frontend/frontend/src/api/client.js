import axios from 'axios'

// Base URL of the FastAPI backend. Override by creating a `.env` file
// with VITE_API_BASE_URL=http://your-host:port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default client
