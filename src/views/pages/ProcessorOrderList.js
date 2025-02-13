// EventList.js
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Pagination
} from '@mui/material'

const events = [
  { id: 1, date: '2023-06-15', name: 'Concert', venue: 'Stadium', orderId: 'A123' },
  { id: 2, date: '2023-06-16', name: 'Conference', venue: 'Convention Center', orderId: 'B456' },
  { id: 3, date: '2023-06-16', name: 'Conference', venue: 'Convention Center', orderId: 'B456' },
  { id: 4, date: '2023-06-16', name: 'Conference', venue: 'Convention Center', orderId: 'B456' },
  { id: 5, date: '2023-06-16', name: 'Conference', venue: 'Convention Center', orderId: 'B456' }
]

const EventList = () => {
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(1)
  const rowsPerPage = 5

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = events.map(event => event.id)
      setSelected(newSelected)
      
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < events.length}
                  checked={events.length > 0 && selected.length === events.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(event => {
              const isItemSelected = isSelected(event.id)

              return (
                <TableRow
                  key={event.id}
                  selected={isItemSelected}
                  onClick={e => handleClick(e, event.id)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>{event.orderId}</TableCell>
                  <TableCell>
                    <Button variant='contained'>View</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={Math.ceil(events.length / rowsPerPage)} page={page} onChange={handlePageChange} />
    </Paper>
  )
}

export default EventList
