/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  TablePagination,
  Toolbar,
  Typography,
  Tooltip,
  Chip,
  Box,
  CircularProgress,
  TextField,
  TableSortLabel,
  Grid,
  InputAdornment,
  Button
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

import { alpha } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { generateWalletLink, deleteMultipleTickets, deleteTicket } from 'src/store/ticketsSlice'
import * as XLSX from 'xlsx'
import DownloadIcon from '@mui/icons-material/Download' // Import the icon

function generateUniqueString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const TicketTable = () => {
  //const { users } = props
  const dispatch = useDispatch()
  const { tickets, WalletLinkStatus, error, status } = useSelector(state => state.tickets)
  const [data, setData] = useState(tickets)
  const [selected, setSelected] = useState([])
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [selectedOrderWalletId, setSelectedOrderWalletId] = useState(null)
  const [multipleWalletData, setMultipleWalletData] = useState(null)
  const [page, setPage] = useState(0)
  const [copyLinkId, setCopyLinkId] = useState(null)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [clickedType, setClickedType] = useState(null) // [multipleOrders, singleOrder]

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('event_name')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setData(tickets)
  }, [tickets])

  useEffect(() => {
    if (WalletLinkStatus === 'succeeded') {
      setData(data.map(row => (row._id === selectedOrderId ? { ...row, walletLinkId: selectedOrderWalletId } : row)))
    }
  }, [WalletLinkStatus])

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(n => n._id)
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

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation()
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleExport = () => {
    // Filter selected data
    const exportData = selected.length > 0 ? data.filter(row => selected.includes(row._id)) : data

    // Map data to a format suitable for export
    const formattedData = exportData.map(row => ({
      OrderID: row.order_id,
      Email: row.account_email,
      EventName: row.event_name,
      EventDate: row.display_datetime,
      Venue: row.venue_name,
      Section: row.section_label,
      Row: row.row_label,
      Seat: row.seat_label,
      WalletID: row.walletLinkId || '',
    }))

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')

    // Export the file
    XLSX.writeFile(workbook, 'orders.xlsx')
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const handleDeleteTicket = id => {
    dispatch(deleteTicket(id))
  }

  const handleDeleteMultipleTickets = () => {
    dispatch(deleteMultipleTickets(selected))

    setSelected([])
  }

  const handleGenerateWallet = id => {
    const walletLinkId = generateUniqueString(64)

    const postData = {
      ticketIds: [id],
      walletLinkId: walletLinkId,
      linkType: 'singleOrder'
    }

    setClickedType('singleOrder')
    setSelectedOrderId(id)
    setSelectedOrderWalletId(walletLinkId)
    dispatch(generateWalletLink(postData))
  }

  const handleGenerateMultipleWallet = () => {
    const walletLinkId = generateUniqueString(64)

    const postData = {
      ticketIds: selected,
      walletLinkId: walletLinkId,
      linkType: 'multipleOrders'
    }
    dispatch(generateWalletLink(postData))
    setMultipleWalletData(postData)
    setClickedType('multipleOrders')
  }

  const copyToClipboard = walletLinkId => {
    const walletUrl = process.env.NEXT_PUBLIC_WALLET_URL
    const walletLink = `${walletUrl}/${walletLinkId}`

    navigator.clipboard
      .writeText(walletLink)
      .then(() => {
        // alert(`Copied to clipboard: ${link}`)
        setCopyLinkId(walletLinkId)
      })
      .catch(err => {
        setCopyLinkId(null)
        console.error('Could not copy text: ', err)
      })
  }

  const arraysContainSameIDs = (arr1, arr2) => {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false
    }

    // Sort the arrays
    const sortedArr1 = arr1.slice().sort()
    const sortedArr2 = arr2.slice().sort()

    // Compare each element
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false
      }
    }

    return true
  }

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const filteredRows = data?.filter(
    row =>
      row.event_name.toLowerCase().includes(filter.toLowerCase()) ||
      row.section_label.toString().includes(filter) ||
      row.row_label.toLowerCase().includes(filter.toLowerCase()) ||
      row.seat_label.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedRows = filteredRows.sort((a, b) => {
    if (orderBy === 'event_name') {
      return (order === 'asc' ? 1 : -1) * a.event_name.localeCompare(b.event_name)
    } else if (orderBy === 'section_label') {
      return (order === 'asc' ? 1 : -1) * (a.section_label - b.section_label)
    } else if (orderBy === 'row_label') {
      return (order === 'asc' ? 1 : -1) * (a.row_label - b.row_label)
    } else {
      return (order === 'asc' ? 1 : -1) * a.seat_label.localeCompare(b.seat_label)
    }
  })

  return (
    <Paper>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected?.length > 0 && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
          })
        }}
      >
     <Grid container>
  <Grid
    item
    xs={12}
    sx={{
      display: 'flex',
      padding: '10px',
      alignItems: 'center',
      gap:"5px"
    }}
  >
    <TextField
      label='Search'
      variant='outlined'
      value={filter}
      onChange={event => setFilter(event.target.value)}
      size='small'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
    <Button
      variant='contained'
      color='primary'
      onClick={handleExport}
      startIcon={<DownloadIcon />} // Add the icon here
      disabled={data.length === 0}
      sx={{ marginLeft: '10px' }} // Add some space between search and button
    >
      Export
    </Button>
  </Grid>
</Grid>
      </Toolbar>

      <TableContainer>
     <Table>
  <TableHead>
    <TableRow>
      <TableCell padding='checkbox'>
        <Checkbox
          indeterminate={
            selected.length > 0 &&
            selected.length < data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).length
          }
          checked={
            data.length > 0 &&
            selected.length === data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).length
          }
          onChange={handleSelectAllClick}
        />
      </TableCell>
      <TableCell>Order ID</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'event_name'}
          direction={orderBy === 'event_name' ? order : 'asc'}
          onClick={() => handleRequestSort('event_name')}
        >
          Event
        </TableSortLabel>
      </TableCell>
      <TableCell>Event Date</TableCell>
      <TableCell>Venue</TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'section_label'}
          direction={orderBy === 'section_label' ? order : 'asc'}
          onClick={() => handleRequestSort('section_label')}
        >
          Section
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'row_label'}
          direction={orderBy === 'row_label' ? order : 'asc'}
          onClick={() => handleRequestSort('row_label')}
        >
          Row
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'seat_label'}
          direction={orderBy === 'seat_label' ? order : 'asc'}
          onClick={() => handleRequestSort('seat_label')}
        >
          Seat
        </TableSortLabel>
      </TableCell>
      <TableCell>Url</TableCell>
      <TableCell>Action</TableCell>
      <TableCell>Wallet ID</TableCell> {/* Wallet ID column placed after Action */}
    </TableRow>
  </TableHead>
  <TableBody>
    {status === 'loading' ? (
      <TableRow>
        <TableCell colSpan={11}>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        </TableCell>
      </TableRow>
    ) : (
      <>
        {sortedRows?.length > 0 ? (
          sortedRows?.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => {
            const isItemSelected = isSelected(row._id);

            return (
              <TableRow
                hover
                key={row._id}
                role='checkbox'
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell padding='checkbox'>
                  <Checkbox checked={isItemSelected} onClick={event => handleCheckboxClick(event, row._id)} />
                </TableCell>
                <TableCell>{row.order_id}</TableCell>
                <TableCell>{row.account_email}</TableCell>
                <TableCell>{row.event_name}</TableCell>
                <TableCell>{row.display_datetime}</TableCell>
                <TableCell>{row.venue_name}</TableCell>
                <TableCell>{row.section_label}</TableCell>
                <TableCell>{row.row_label}</TableCell>
                <TableCell>{row.seat_label}</TableCell>
                <TableCell>
                  {row.walletLinkId ? (
                    <Tooltip title='Copy link'>
                      <Chip
                        label={copyLinkId === row.walletLinkId ? 'Copied' : 'Copy'}
                        color={'success'}
                        sx={{
                          height: 24,
                          marginRight: '5px',
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                        onClick={() => copyToClipboard(row.walletLinkId)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Generate Wallet Link'>
                      <Chip
                        color={'info'}
                        label={
                          clickedType === 'singleOrder' &&
                          selectedOrderId === row._id &&
                          WalletLinkStatus === 'loading' ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {'Generating'}
                              <CircularProgress size={20} style={{ marginLeft: 10, color: '#fff' }} />
                            </div>
                          ) : (
                            'Generate Wallet'
                          )
                        }
                        sx={{
                          height: 24,
                          marginRight: '5px',
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                        onClick={() => handleGenerateWallet(row._id)}
                        disabled={
                          (clickedType === 'singleOrder' &&
                            WalletLinkStatus === 'loading' &&
                            selectedOrderId === row._id) ||
                          selected?.length > 0
                        }
                      />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title='Delete'>
                    <Chip
                      label={'Delete'}
                      color={'error'}
                      sx={{
                        marginRight: '5px',
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                      onClick={() => handleDeleteTicket(row._id)}
                      disabled={selected?.length > 0}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>{row.walletLinkId ? row.walletLinkId : ''}</TableCell> {/* Wallet ID moved here */}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={11}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography
                  sx={{
                    height: 24,
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                  component='div'
                >
                  No Orders Found!
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </>
    )}
  </TableBody>
</Table>

      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TicketTable
