import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
// import useStyles from '../../utils/styles';
import classes from '../../utils/classes';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';

// defining the reducer function for the react useReducer hook with each cases
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };

    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };

    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };

    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };

    default:
      state;
  }
}

function Order({ params }) {
  // getting the orderId from the params
  const orderId = params.id;

  // using the reducer hook from paypal
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Css
  // const classes = useStyles();

  const router = useRouter();

  // getting state from useContext and passing in the Store to get access to get access to the
  // react context in the utils/Store
  const { state } = useContext(Store);

  // Getting the userInfo from state
  const { userInfo } = state;

  // defining the react reducer => parameters for useReducer: reducer function and default values
  const [
    {
      loading,
      error,
      order,
      successPay /* , loadingDeliver, successDeliver  */,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  // get all information from order by deconstructing order object after we fetch it from the database using the api
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  // redirect the user back to the login page if user info is undefined (means not authenticated)
  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }

    // fetching the order information from the database
    const fetchOrder = async () => {
      try {
        // use the reducer hook to dispatch this information
        dispatch({ type: 'FETCH_REQUEST' }); // reducer hook

        const { data } = await axios.get(`/api/orders/${orderId}`, {
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

    if (
      !order._id ||
      successPay ||
      /* successDeliver || */ (order._id && order._id !== orderId)
    ) {
      // order coming from reducer
      // calling the function

      fetchOrder();

      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }

      /*  if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      } */
    } else {
      // implementing paypal payment action
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        // loading the paypal payment screen by dispatching the action
        // setting the client id for paypal
        paypalDispatch({
          type: 'resetOptions', // bc we have access to clientId we use this to change it
          value: {
            'client-id': clientId, // clientId going to come from the backend
            currency: 'EUR',
          },
        });

        // loading paypal script from paypal website.
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };

      loadPaypalScript();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, successPay]);

  const { enqueueSnackbar } = useSnackbar();

  // functions that handles the paypal payment actions

  // function creates a payment order to paypal
  function createOrder(data, actions) {
    // call action from paypal to create an order

    return actions.order
      .create({
        // create functions returns a promise
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      }); // orderID here is created by paypal
  }

  // functions happens on a successful payment on paypal
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        // do something
        dispatch({ type: 'PAY_REQUEST' });

        // ajax request to update the order information on the backend
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          },
        );

        dispatch({ type: 'PAY_SUCCESS', payload: data });
        enqueueSnackbar(`The total of €${totalPrice} Paid`, {
          variant: 'success',
        });
        // enqueueSnackbar('Order is paid', { variant: 'success' });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: 'error' }); // getting this error
      }
    });
  }

  // functions that handles an error from the paypal payment
  function onError(err) {
    enqueueSnackbar(getError(err), { variant: 'error' });
  }

  return (
    <Layout title={`Oder Detail Id: ${orderId}`}>
      <section>
        <Box sx={classes.allPagesPadding}>
          {' '}
          <Typography component="h1" variant="h1">
            Order Id: {orderId}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography sx={classes.error}>{error}</Typography>
          ) : (
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                {/* Shipping Information Material Ui Card */}
                <Card sx={classes.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Shipping Address
                      </Typography>
                    </ListItem>

                    <ListItem>
                      {shippingAddress.fullName}, &nbsp;{' '}
                      {shippingAddress.address}, &nbsp;
                      {shippingAddress.city}, &nbsp;{shippingAddress.postalCode}
                      , &nbsp;
                      {shippingAddress.country}
                    </ListItem>

                    <ListItem>
                      Status:{' '}
                      {isDelivered
                        ? `Delivery started on ${deliveredAt.slice(0, 10)}`
                        : 'not delivered'}
                    </ListItem>
                  </List>
                </Card>

                {/* payment method Material Ui Card */}
                <Card sx={classes.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Payment Method
                      </Typography>
                    </ListItem>

                    <ListItem>{paymentMethod}</ListItem>

                    <ListItem>
                      Status:{' '}
                      {isPaid
                        ? `Payment of € ${totalPrice}, made on ${paidAt.slice(
                            0,
                            10,
                          )}`
                        : 'not paid'}
                    </ListItem>
                  </List>
                </Card>

                {/* product details Material Ui Card */}
                <Card sx={classes.section}>
                  {' '}
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Order Items
                      </Typography>
                    </ListItem>

                    <ListItem>
                      <TableContainer>
                        <Table>
                          {/* Table Header From Material UI */}
                          <TableHead>
                            <TableRow>
                              <TableCell>Image</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Price</TableCell>
                            </TableRow>
                          </TableHead>

                          {/* Table Body From Material UI*/}
                          <TableBody>
                            {orderItems.map((orderItem) => (
                              <TableRow key={orderItem._id}>
                                {/* Table Image Cell */}
                                <TableCell>
                                  <NextLink
                                    href={`/product/${orderItem.slug}`}
                                    passHref
                                  >
                                    <Link>
                                      <Image
                                        src={orderItem.image}
                                        alt={orderItem.name}
                                        width={50}
                                        height={50}
                                      ></Image>
                                    </Link>
                                  </NextLink>
                                </TableCell>

                                {/* Table name Cell */}

                                <TableCell>
                                  <NextLink
                                    href={`/product/${orderItem.slug}`}
                                    passHref
                                    /* Use this for the farmer to connect the farmer and their products : Idea */
                                  >
                                    <Link>
                                      <Typography>{orderItem.name}</Typography>
                                    </Link>
                                  </NextLink>
                                </TableCell>

                                {/* Table Quantity Cell */}
                                <TableCell align="right">
                                  <Typography>{orderItem.quantity}</Typography>
                                </TableCell>

                                {/* Table cell for Price */}
                                <TableCell align="right">
                                  <Typography>€{orderItem.price}</Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </ListItem>
                  </List>
                </Card>
              </Grid>

              {/* Order Summary Material Ui Card */}
              <Grid item md={3} xs={12}>
                <Card sx={classes.section}>
                  <List>
                    <ListItem>
                      <Typography variant="h2">Oder Summary</Typography>
                    </ListItem>
                    {/* Items Price */}
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Items:</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography align="right">€{itemsPrice}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/* Tax Price */}
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Tax:</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography align="right">€{taxPrice}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/* Shipping Price */}
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Shipping:</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography align="right">
                            €{shippingPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/* Total Price */}
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>
                            <strong>Total:</strong>
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography align="right">
                            <strong>€{totalPrice}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/*  Paypal corners*/}

                    {!isPaid ? (
                      /* !userInfo.isAdmin ?  */ <ListItem>
                        {isPending ? (
                          <CircularProgress />
                        ) : (
                          <Box sx={classes.fullWidth}>
                            <PayPalButtons
                              style={{
                                color: 'blue',
                                label: 'pay',
                              }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </Box>
                        )}
                      </ListItem>
                    ) : (
                      <ListItem>
                        <NextLink href="/order-history" passHref>
                          <Button
                            variant="contained"
                            fullWidth
                            component="a"
                            color="primary"
                          >
                            Back To Dashboard
                          </Button>
                        </NextLink>
                      </ListItem>
                    )}
                  </List>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </section>
    </Layout>
  );
}

// getting the orderId from the database in other to get the ordered items.
export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
