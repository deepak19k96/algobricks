import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clientConfig from 'src/config/config';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';

const FranchiseList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // Sorting state
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchData = async (page = 1, limit = 20) => {
      setLoading(true);
      const { siteUrl, AUTH_KEY } = clientConfig;
      try {
        const response = await axios.post(
          `${siteUrl}/wp-json/wl/v1/get_all_users_data?page=${page}&limit=${limit}`,
          { AUTH_KEY },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const allUsers = response.data;
        const franchiseOwners = allUsers.filter(user => user.role === 'franchise_owner');
        const allStudents = allUsers.filter(user => user.role === 'student');

        // For each franchise owner, add a property to store the number of students.
        const updatedOwners = franchiseOwners.map(owner => {
          const studentCount = allStudents.filter(
            student => student.teacher_id === JSON.stringify(owner.user_id)
          ).length;
          return { ...owner, numberOfStudents: studentCount };
        });

        setUsers(updatedOwners);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle sorting for FirstName and LastName
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);

    const sortedData = [...users].sort((a, b) => {
      if (a[property] < b[property]) return newOrder === 'asc' ? -1 : 1;
      if (a[property] > b[property]) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedData);
  };

  // Navigate to the Students List page when button is clicked
  const gotoStudentsList = (userId, firstName) => {
    localStorage.setItem('userId', userId);
    window.location.href = `/students_list/${firstName}`;
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Franchise Owners
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'FirstName'}
                    direction={orderBy === 'FirstName' ? order : 'asc'}
                    onClick={() => handleSort('FirstName')}
                  >
                    First Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'LastName'}
                    direction={orderBy === 'LastName' ? order : 'asc'}
                    onClick={() => handleSort('LastName')}
                  >
                    Last Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Territory</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.FirstName}</TableCell>
                  <TableCell>{user.LastName}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Country}</TableCell>
                  <TableCell>{user.State}</TableCell>
                  <TableCell>{user.Territory}</TableCell>
                  <TableCell>{user.numberOfStudents}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => gotoStudentsList(user.user_id, user.FirstName)}
                    >
                      Students List
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default FranchiseList;
