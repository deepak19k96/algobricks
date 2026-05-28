import axios from 'axios'

const siteUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: siteUrl || 'https://algobrixbackers.youngengineers.org/api/', // Replace this with your base URL
  timeout: 10000 // Optional timeout configuration
  // You can also add other default configurations here
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem('accessToken')

    // Clean up corrupted tokens that were saved as strings
    if (accessToken === 'undefined' || accessToken === 'null') {
      localStorage.removeItem('accessToken')
    }

    const validToken = localStorage.getItem('accessToken')

    // Modify config before sending the request
    // Skip Authorization for specific public endpoints. WordPress sometimes rejects authenticated
    // requests for public resources if the user role doesn't have explicit custom permissions.
    const isPublicEndpoint = 
      config.url?.includes('wp/v2/package') || 
      config.url?.includes('wp/v2/pages') || 
      config.url?.includes('get-algobrix-backers')
    
    if (validToken && !isPublicEndpoint) {
      config.headers['Authorization'] = `Bearer ${validToken}`

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
    const isJwtError = error.response?.data?.code?.includes('jwt_auth');

    if ((error.response.status === 401 || (error.response.status === 403 && isJwtError)) && !originalRequest._retry) {
      // Handle case where no refresh token is available or token is invalid
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
