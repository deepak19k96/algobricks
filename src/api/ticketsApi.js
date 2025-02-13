// src/api/ticketsAPI.js
import axiosInstance from 'src/api/axiosInstance'

const API_URL = '/api/tickets'

export const fetchTicketsApi = async () => {
  const response = await axiosInstance.get('/api/tickets')

  return response.data
}

export const addTicketApi = async ticket => {
  const response = await axiosInstance.post('/tickets', ticket)

  return response.data
}

export const deleteTicketApi = async ticketId => {
  const response = await axiosInstance.delete(`/api/tickets/${ticketId}`)

  return response.data
}

export const deleteMultipleTicketsApi = async ticketIds => {
  const response = await axiosInstance.post(`/api/tickets/delete-multiple`, { ticketIds: ticketIds })

  return response.data
}

export const modifyTicketApi = async ({ id, ticket }) => {
  const response = await axiosInstance.put(`/tickets/${id}`, ticket)

  return response.data
}

export const generateWalletLinkApi = async payload => {
  const response = await axiosInstance.post(`/api/generateWalletLink`, payload)

  return response.data
}
