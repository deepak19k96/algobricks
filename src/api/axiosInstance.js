import axios from 'axios'

const siteUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: siteUrl || 'https://online.youngengineers.org', // Replace this with your base URL
  timeout: 10000 // Optional timeout configuration
  // You can also add other default configurations here
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem('accessToken')

    // Modify config before sending the request
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`

      //config.headers['Path'] = path;
    }

    return config
  },
  error => {
    // Handle request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Modify response data before returning
    return response
  },
  error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      // Handle case where no refresh token is available
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        window.location.href = '/pages/login'
      }
    }

    // Handle response error
    return Promise.reject(error)
  }
)

export default axiosInstance
