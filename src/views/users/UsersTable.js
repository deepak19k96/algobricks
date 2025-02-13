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
  TextField,
  TableSortLabel,
  Grid,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CleaningServices as SweepIcon,
  SwapHoriz as SwapIcon
} from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useSelector } from 'react-redux'

const UsersTable = () => {
  //const { users } = props
  const { users, userStatus, error, status } = useSelector(state => state.users)
  const [data, setData] = useState(users)
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('event_name')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setData(users)
  }, [users])

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
    handleClick(event, id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const handleEdit = selectedRow => {
    console.log(`Edit row with id: ${selectedRow}`)

    // Implement edit functionality here
  }

  const handleDelete = selectedRow => {
    setData(data.filter(row => row._id !== selectedRow?._id))
    setSelected([])
  }

  const handleSingleSwap = selectedRow => {
    setData(data.map(row => (row._id === selectedRow?._id ? { ...row, status: 'swaped' } : row)))
  }

  const handleSwap = () => {
    console.log(`Swap rows with ids: ${selected}`)

    // Implement swap functionality here
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
      row.email.toLowerCase().includes(filter.toLowerCase()) ||
      row.site.toString().includes(filter) ||
      row.status.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedRows = filteredRows.sort((a, b) => {
    if (orderBy === 'email') {
      return (order === 'asc' ? 1 : -1) * a.email.localeCompare(b.email)
    } else if (orderBy === 'site') {
      return (order === 'asc' ? 1 : -1) * (a.site - b.site)
    } else {
      return (order === 'asc' ? 1 : -1) * a.status.localeCompare(b.status)
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
            xs={4}
            sx={{
              display: 'flex',
              padding: '10px'
            }}
          >
            {' '}
            <TextField
              label='Search'
              variant='outlined'
              value={filter}
              onChange={handleFilterChange}
              size='small'
              margin='normal'
              sx={{
                margin: '0px !important'
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              padding: '10px'
            }}
          >
            {selected?.length > 0 && (
              <>
                <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                  {selected?.length} selected
                </Typography>
                <Tooltip title='Edit'>
                  <IconButton onClick={() => handleEdit(selected[0])}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Delete'>
                  <IconButton onClick={() => handleDelete(selected[0])}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Swap'>
                  <IconButton onClick={handleSwap} sx={{ color: 'green' }}>
                    <Chip
                      label='Swap'
                      color={'success'}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </>
            )}
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

              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'site'}
                  direction={orderBy === 'site' ? order : 'asc'}
                  onClick={() => handleRequestSort('site')}
                >
                  Site
                </TableSortLabel>
              </TableCell>
              <TableCell>Password</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status === 'loading' ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {sortedRows?.length > 0 ? (
                  sortedRows?.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => {
                    const isItemSelected = isSelected(row._id)

                    return (
                      <TableRow
                        hover
                        key={row._id}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox checked={isItemSelected} onClick={event => handleCheckboxClick(event, row)} />
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.site}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={'warning'}
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-label': { fontWeight: 500 }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {/*  <Tooltip title='Edit'>
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
              </Tooltip> */}
                          {row.status === 'pending' && (
                            <Tooltip title='Run'>
                              <IconButton onClick={() => handleSingleSwap(row)} sx={{ color: 'green' }}>
                                <Chip
                                  label='Run'
                                  color={'success'}
                                  sx={{
                                    height: 24,
                                    fontSize: '0.75rem',
                                    textTransform: 'capitalize',
                                    '& .MuiChip-label': { fontWeight: 500 }
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box display='flex' justifyContent='center' alignItems='center'>
                        <Typography
                          sx={{
                            height: 24,
                            fontSize: '1rem',
                            fontWeight: 500
                          }}
                          component='div'
                        >
                          No Users Credentials Found!
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

export default UsersTable
