import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react';
import { Bar } from 'react-chartjs-2';
import Layout from '../../../components/Layout';
// import useStyles from '../../../utils/styles';
import classes from '../../../utils/classes';
import { getError } from '../../../utils/error';
import { Store } from '../../../utils/Store';

// on this page i am fetching all the orders of the user from the database and displaying them
// to the user

// defining the reducer function for the react useReducer hook with each cases
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Orders() {
  // getting the userInfo from the state of the react context from the Store.js
  const { state } = useContext(Store);

  const router = useRouter();

  // Css
  // const classes = useStyles();

  const { userInfo } = state;

  // defining the react reducer => parameters for useReducer: reducer function and default values
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  // this makes sure that only a logged in user can access this page
  useEffect(() => {
    // check if userInfo exists
    if (!userInfo) {
      // if not, redirect to login page
      router.push('/login');

      // if the userInfo is available but not an admin then redirect to the user's profile
    } else if (!userInfo.isAdmin) {
      router.push('/profile');
    }

    // fetching the order information from the database
    const fetchData = async () => {
      try {
        // use the reducer hook to dispatch this information
        dispatch({ type: 'FETCH_REQUEST' }); // reducer hook

        // making the api call to fetch the data
        const { data } = await axios.get(`/api/admin/orders`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        // dispatch successful fetch using the react context
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        // if request fails
        // dispatch error
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    // calling the fetchData function
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Order Items">
      <Box sx={classes.allPagesPadding}>
        <section>
          <Box sx={classes.siteAdminStyle}>
            <Typography component="h1" variant="h1">
              Order Items {/* Maybe not needed	 */}
            </Typography>

            <Grid container spacing={1}>
              <Grid item md={3} xs={12}>
                <Card sx={classes.section}>
                  <List>
                    <NextLink href="/admin/dashboard" passHref>
                      <ListItem button component="a">
                        <ListItemText primary="Farm Manager"></ListItemText>
                      </ListItem>
                    </NextLink>

                    <NextLink href="/admin/orders" passHref>
                      <ListItem selected button component="a">
                        <ListItemText primary="Orders"></ListItemText>
                      </ListItem>
                    </NextLink>

                    <NextLink href="/admin/products" passHref>
                      <ListItem button component="a">
                        <ListItemText primary="Products"></ListItemText>
                      </ListItem>
                    </NextLink>

                    <NextLink href="/admin/users" passHref>
                      <ListItem button component="a">
                        <ListItemText primary="Users"></ListItemText>
                      </ListItem>
                    </NextLink>
                  </List>
                </Card>
              </Grid>

              {/* Main order information and content */}
              <Grid item md={9} xs={12}>
                <Card sx={classes.section}>
                  <List>
                    <ListItem>
                      <Typography component="h1" variant="h1">
                        Orders
                      </Typography>
                    </ListItem>

                    <ListItem>
                      {loading ? (
                        <CircularProgress />
                      ) : error ? (
                        <Typography sx={classes.error}>{error}</Typography>
                      ) : (
                        <TableContainer>
                          <Table>
                            {/* table header here */}
                            <TableHead>
                              <TableRow>
                                {/* columns */}
                                <TableCell>ID</TableCell>
                                <TableCell>USER</TableCell>
                                <TableCell>ORDER DATE</TableCell>
                                <TableCell>TOTAL</TableCell>
                                <TableCell>PAYMENT STATUS</TableCell>
                                <TableCell>DELIVERY STATUS</TableCell>
                                <TableCell align="center">ACTION</TableCell>
                              </TableRow>
                            </TableHead>

                            {/* the table body */}
                            <TableBody>
                              {orders.map((order) => (
                                <TableRow key={order._id}>
                                  <TableCell>
                                    {order._id.substring(20, 24)}
                                  </TableCell>

                                  {/* This will display the user that made the particular order */}
                                  <TableCell>
                                    {order.user
                                      ? order.user.name
                                      : 'DELETED USER'}
                                  </TableCell>

                                  <TableCell>
                                    {order.createdAt.slice(0, 10)}
                                  </TableCell>

                                  <TableCell>€ {order.totalPrice}</TableCell>

                                  <TableCell>
                                    {order.isPaid
                                      ? `Payment made on ${order.paidAt.slice(
                                          0,
                                          10,
                                        )}`
                                      : 'Not Paid'}
                                  </TableCell>

                                  <TableCell>
                                    {order.isDelivered
                                      ? `Delivery Started on ${order.deliveredAt.slice(
                                          0,
                                          10,
                                        )}`
                                      : 'Not Delivered'}
                                  </TableCell>

                                  <TableCell>
                                    <NextLink
                                      href={`/admin/orders/${order._id}`}
                                      passHref
                                    >
                                      <Button
                                        style={{
                                          textAlign: 'center',
                                        }}
                                        variant="contained"
                                        color="secondary"
                                      >
                                        Order Detail
                                      </Button>
                                    </NextLink>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </section>
      </Box>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Orders), { ssr: false });
