import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image'; // MY PERSONAL Import
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import cartIcon from '../public/images/cart.png'; // MY PERSONAL Import
import profileIcon from '../public/images/profileLogo.png'; // MY PERSONAL Import
import styles from '../styles/NewUpgradedStyles.module.css';
import classes from '../utils/classes';
import { Store } from '../utils/Store';
import Footer from './Footer'; // MY PERSONAL Import
import Header from './Header'; // MY PERSONAL Import

export default function Layout({
  description,
  title,
  children,
  customLayoutClassName,
}) {
  // using the context from the StoreProvide component.
  const { state, dispatch } = useContext(Store);

  // deconstructing the darkmode and cart from the state
  const { darkMode, cart, userInfo } = state;

  // creating a material UI theme to customize my application
  const theme = createTheme({
    // this was changed to createTheme as advised but it throws an error

    // This is new from mui
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },

    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
        fontFamily: 'oswald',
      },

      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
        fontFamily: 'oswald',
      },

      h3: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
        fontFamily: 'oswald',
      },
    },

    palette: {
      mode: darkMode ? 'dark' : 'light', // mode is new from mui was type
      primary: {
        main: '#002B2B',
      },
      secondary: {
        main: '#002B2B',
      },
    },
  });

  // setting the router
  const router = useRouter();

  // Using the classes and styles from Material UI
  // const classes = useStyles(); now using new mui

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });

    // getting the new Dark mode which shouldn't be the current dark mode
    const newDarkMode = !darkMode;

    // setting a new darkModeState variable value
    // setDarkModeState(newDarkMode); // this is handling the toggle unstable problem

    // setting the new cookie value to the cookie for persistence
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  // function that handles the user profile menu show and hide
  // first define state for the anchor element according to material ui documentary
  const [anchorEl, setAnchorEl] = useState(null);

  // define and set the function that shows the menu
  const loginClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // define and set the function that hides the menu
  const loginMenuCloseHandler = (event, redirect) => {
    setAnchorEl(null);

    if (redirect !== 'backdropClick') {
      router.push(redirect);
    }
  };

  // function that handles the user logout
  const logoutClickHandler = (event) => {
    setAnchorEl(null); // first close the menu bar

    // dispatching the logout event to the react context
    dispatch({ type: 'USER_LOGOUT' });

    // remove user session after logout
    Cookies.remove('userInfo');

    // remove cartItems
    Cookies.remove('cartItems');

    //Newly added
    // remove shipping address
    Cookies.remove('shippingAddress');

    //Newly added
    // remove paymentMethod
    Cookies.remove('paymentMethod');

    // redirect user back to home screen
    router.push('/');
  };

  // This is new from mui
  const isDesktop = useMediaQuery('(min-width: 600px)');

  return (
    <>
      <section>
        <Box sx={customLayoutClassName}>
          <Head>
            <title>{title ? `${title} - Pure Farm` : 'Pure Farm'}</title>
            {description && (
              <meta name="description" content={description}></meta>
            )}
          </Head>

          <ThemeProvider theme={theme}>
            {/* Defining the Css Baseline for the theme provider */}

            <CssBaseline />

            {/* Upper Navigation (Cart, login, register) */}
            <AppBar position="static" sx={classes.appbar}>
              <Toolbar sx={classes.toolbar}>
                <Box sx={classes.grow}>
                  <Typography
                    component="p"
                    variant="p"
                    sx={classes.hideOnMobile}
                  >
                    Email: victorejikewebdev@gmail.com
                  </Typography>
                </Box>
                {/* push menu items to right */}

                <div className={styles.flex}>
                  <Switch
                    sx={classes.disableSwitch}
                    checked={darkMode} /*{
                  darkModeState
                }  I changed back to the old value that was not persisting the toggle */
                    onChange={darkModeChangeHandler}
                    style={{ display: 'none' }}
                  ></Switch>

                  <NextLink href="/cart" passHref>
                    <Link>
                      {cart.cartItems.length > 0 ? (
                        <Badge
                          color="success"
                          badgeContent={cart.cartItems.length}
                        >
                          <Box sx={classes.cartIcon}>
                            <Image
                              src={cartIcon}
                              alt="Pure Farm Cart Icon"
                            ></Image>
                          </Box>
                        </Badge>
                      ) : (
                        <Box sx={classes.cartIcon}>
                          <Image
                            src={cartIcon}
                            alt="Pure Farm Cart Icon"
                          ></Image>
                        </Box>
                      )}
                    </Link>
                  </NextLink>
                  {/* Hide login and register if the user is already logged in */}
                  {userInfo ? (
                    /* Set css styles for this button later */

                    <Box sx={classes.loggedInUserContainer}>
                      <Button
                        aria-controls="simple-Menu"
                        aria-haspopup="true"
                        onClick={
                          loginClickHandler
                        } /* Change this handler to showUserProfileMenuClickHandler */
                        sx={classes.navbarButton}
                      >
                        <Typography component="p" variant="p">
                          Welcome: {userInfo.name}
                        </Typography>
                      </Button>

                      {/* Simple Menu from Material UI */}
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={
                          loginMenuCloseHandler
                        } /* Change this handler to closeUserProfileMenuClickHandler */
                      >
                        <MenuItem
                          onClick={(event) =>
                            loginMenuCloseHandler(event, '/profile')
                          }
                        >
                          Profile
                        </MenuItem>

                        {!userInfo.isSiteAdmin && (
                          <MenuItem
                            onClick={(event) =>
                              loginMenuCloseHandler(event, '/order-history')
                            }
                          >
                            Order History
                          </MenuItem>
                        )}

                        {/* Checking if the user is an admin user or not */}

                        {userInfo.isAdmin && (
                          <MenuItem
                            onClick={(event) =>
                              loginMenuCloseHandler(event, '/admin/dashboard')
                            }
                          >
                            Admin Dashboard
                          </MenuItem>
                        )}

                        {/* Checking if the user is a site admin or not,, I am the only site admin */}

                        {userInfo.isSiteAdmin && (
                          <MenuItem
                            onClick={(event) =>
                              loginMenuCloseHandler(event, '/admin/site-admin')
                            }
                          >
                            View Site Stats
                          </MenuItem>
                        )}

                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                      </Menu>
                    </Box>
                  ) : (
                    /* conditionally render the login and register button based on if the user is logged in or not */
                    <div className={styles.flex}>
                      <NextLink href="/login" passHref>
                        <Link>
                          <Box component="span" sx={classes.profileIcon}>
                            <PersonIcon />
                          </Box>{' '}
                          Login
                        </Link>
                      </NextLink>

                      <span className={styles.lineUp}>&#8739;</span>

                      <NextLink href="/register-type" passHref>
                        <Link> Register</Link>
                      </NextLink>
                    </div>
                  )}
                </div>
              </Toolbar>
            </AppBar>

            <Header />

            <Container component="main" sx={classes.main} maxWidth={false}>
              {children}
            </Container>
            <Footer className={styles.footer} /* sx={classes.footer}  */ />
          </ThemeProvider>
        </Box>
      </section>
    </>
  );
}
