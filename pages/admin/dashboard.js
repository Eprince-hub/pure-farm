import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useReducer, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Layout from '../../components/Layout';
// import useStyles from '../../utils/styles';
import classes from '../../utils/classes';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';

// on this page i am fetching all the orders of the user from the database and displaying them
// to the user

// defining the reducer function for the react useReducer hook with each cases
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  // getting the userInfo from the state of the react context from the Store.js
  const { state } = useContext(Store);

  const router = useRouter();

  // Css
  /* const classes = useStyles(); */

  const { userInfo } = state;

  // A user must be the site Administrator in oder to see or edit some information on this page
  // set state variable for a site admin
  const [isUserSiteAdmin, setIsUserSiteAdmin] = useState(false);

  // defining the react reducer => parameters for useReducer: reducer function and default values
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
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
    } else if (userInfo.isSiteAdmin) {
      router.push('/admin/site-admin');
    }

    // fetching the order information from the database
    const fetchData = async () => {
      try {
        // use the reducer hook to dispatch this information
        dispatch({ type: 'FETCH_REQUEST' }); // reducer hook

        // making the api call to fetch the data
        const { data } = await axios.get(`/api/admin/summary`, {
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

    // set user that matches the site Admin into the state variable
    setIsUserSiteAdmin(userInfo.isSiteAdmin);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Farm Manager">
      <Box sx={classes.allPagesPadding}>
        <section>
          <Box sx={classes.siteAdminStyle}>
            <Typography component="h1" variant="h1">
              Your Farm Manager {/* Maybe not needed	 */}
            </Typography>

            <Grid container spacing={1}>
              <Grid item md={3} xs={12}>
                <Card sx={classes.section}>
                  <List>
                    <NextLink href="/admin/dashboard" passHref>
                      <ListItem selected button component="a">
                        <ListItemText primary="Farm Manager"></ListItemText>
                      </ListItem>
                    </NextLink>

                    <NextLink href="/admin/orders" passHref>
                      <ListItem button component="a">
                        <ListItemText primary="Orders"></ListItemText>
                      </ListItem>
                    </NextLink>

                    <NextLink href="/admin/products" passHref>
                      <ListItem button component="a">
                        <ListItemText primary="Products"></ListItemText>
                      </ListItem>
                    </NextLink>

                    {isUserSiteAdmin && (
                      <NextLink href="/admin/users" passHref>
                        <ListItem button component="a">
                          <ListItemText primary="Users"></ListItemText>
                        </ListItem>
                      </NextLink>
                    )}
                  </List>
                </Card>
              </Grid>

              {/* Main order information and content */}
              <Grid item md={9} xs={12}>
                <Card sx={classes.section}>
                  <List>
                    <ListItem>
                      {loading ? (
                        <CircularProgress />
                      ) : error ? (
                        <Typography sx={classes.error}>{error}</Typography>
                      ) : (
                        <Grid container spacing={5}>
                          {/* Sales Card */}
                          <Grid item xs={12} md={isUserSiteAdmin ? 3 : 4}>
                            <Card raised>
                              <CardContent>
                                <Typography variant="h1" component="h1">
                                  € {summary.ordersPrice}
                                </Typography>

                                <Typography>Sales</Typography>
                              </CardContent>

                              <CardActions>
                                <NextLink
                                  href="/admin/sales" /* Just realized this has no page,, implement */
                                  color="primary"
                                  passHref
                                >
                                  <Button size="small" color="primary">
                                    View Sales
                                  </Button>
                                </NextLink>
                              </CardActions>
                            </Card>
                          </Grid>

                          {/* Orders Card */}
                          <Grid item xs={12} md={isUserSiteAdmin ? 3 : 4}>
                            <Card raised>
                              <CardContent>
                                <Typography variant="h1" component="h1">
                                  {summary.ordersCount}
                                </Typography>

                                <Typography>Orders</Typography>
                              </CardContent>

                              <CardActions>
                                <NextLink
                                  href="/admin/orders"
                                  color="primary"
                                  passHref
                                >
                                  <Button size="small" color="primary">
                                    View Orders
                                  </Button>
                                </NextLink>
                              </CardActions>
                            </Card>
                          </Grid>

                          {/* Products Card */}

                          <Grid item xs={12} md={isUserSiteAdmin ? 3 : 4}>
                            <Card raised>
                              <CardContent>
                                <Typography variant="h1" component="h1">
                                  {summary.productsCount}
                                </Typography>

                                <Typography>Products</Typography>
                              </CardContent>

                              <CardActions>
                                <NextLink
                                  href="/admin/products"
                                  color="primary"
                                  passHref
                                >
                                  <Button size="small" color="primary">
                                    View Products
                                  </Button>
                                </NextLink>
                              </CardActions>
                            </Card>
                          </Grid>

                          {/* conditionally render the users's Card */}
                          {isUserSiteAdmin && (
                            <Grid item xs={12} md={3}>
                              <Card raised>
                                <CardContent>
                                  <Typography variant="h1" component="h1">
                                    {summary.usersCount}
                                  </Typography>

                                  <Typography>Users</Typography>
                                </CardContent>

                                <CardActions>
                                  <NextLink
                                    href="/admin/users"
                                    color="primary"
                                    passHref
                                  >
                                    <Button size="small" color="primary">
                                      View Users
                                    </Button>
                                  </NextLink>
                                </CardActions>
                              </Card>
                            </Grid>
                          )}
                        </Grid>
                      )}
                    </ListItem>

                    <ListItem>
                      <Typography component="h1" variant="h1">
                        Daily Sales Chart
                      </Typography>
                    </ListItem>

                    <ListItem>
                      <Bar
                        data={{
                          labels: summary.salesData.map((data) => data._id),
                          datasets: [
                            {
                              label: 'Daily Sales',
                              backgroundColor: 'rgba(0, 43, 43, 1)',
                              data: summary.salesData.map(
                                (data) => data.totalSales,
                              ),
                            },
                          ],
                        }}
                        options={{
                          legend: { display: true, position: 'right' },
                        }}
                      ></Bar>
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

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
