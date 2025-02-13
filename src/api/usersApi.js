// src/api/userAPI.js
import axiosInstance from 'src/api/axiosInstance'

const API_URL = '/api/users'

export const fetchUsers = async () => {
  const response = await axiosInstance.get('/api/credential/fetch')

  return response.data
}

export const fetchUsersWithId = async id => {
  const response = await axiosInstance.get(`/api/credential/${id}`)

  return response.data
}

export const getUserProfile = async () => {
  const response = await axiosInstance.get('/api/profile')

  return response.data
}

export const addUser = async user => {
  const response = await axiosInstance.post(API_URL, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.data
}

export const updateUser = async user => {
  const response = await axiosInstance.put(`${API_URL}/${user._id}`, user, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response.data
}

export const updateUserProfile = async user => {
  const response = await axiosInstance.put(`/api/updateUserProfile/${user?._id}`, user)

  return response.data
}

export const deleteUser = async userId => {
  await axiosInstance.delete(`${API_URL}/${userId}`)

  return userId
}
