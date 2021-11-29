const classes = {
  // common classes for my application
  flex: {
    display: 'flex',
  },

  hidden: {
    display: 'none',
  },

  visible: {
    display: 'initial',
  },

  sort: {
    marginRight: 1,
  },

  fullHeight: { height: '100vh' },
  fullWidth: {
    width: '100%',
  },

  error: {
    color: '#F04040',
  },

  // layout section styles
  main: {
    minHeight: '100vh',
  },

  section: {
    marginTop: 1,
    marginBottom: 1,
  },

  // header section
  appbar: {
    backgroundColor: '#002B2B',
    width: '100%',

    '& a': {
      color: '#FFFFFF',
      marginLeft: 1,
      fontSize: '1.2rem',
      marginRight: '10px',
    },
  },

  toolbar: {
    justifyContent: 'space-between',
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  grow: {
    flexGrow: 1,
  },

  hideOnMobile: {
    '@media (max-width: 870px)': {
      display: 'none',
    },
  },

  disableSwitch: {
    display: 'none',
  },

  cartIcon: {
    width: 30,
  },

  /* profileIcon: {
    marginRight: 5,
  }, */

  loggedInUserContainer: {
    minWidth: '10rem',
    marginLeft: '2rem',

    '@media (max-width: 870px)': {
      marginLeft: '0rem',
    },
  },

  navbarButton: {
    color: '#FFFFFF',
    textTransform: 'initial',
    fontSize: '1.2rem',

    '@media (max-width: 870px)': {
      fontSize: '1rem',
    },
  },

  // buttons for the side navbar which changes acording to scroll
  navbarButtonOnScroll: {
    color: '#FFFFFF',
    width: 40,
    height: 40,
  },

  sideNavbarButton: {
    color: '#002B2B',
    width: 40,
    height: 40,
  },

  menuButton: {
    padding: 0,
  },
  // mt1 was removed

  // Search section
  searchForm: {
    border: '1px solid #FFFFFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },

  searchInput: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },

  //iconButton renamed to search button
  searchButton: {
    backgroundColor: '#002B2B',
    padding: '5px',
    borderRadius: '0 4px 4px 0',

    '& span': {
      color: '#FFFFFF',

      '& :hover': {
        color: '#000000',
      },
    },
  },

  navbarButtons: {
    width: '40%',
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#002B2B',

    '& a': {
      color: '#002B2B',
      fontFamily: 'Oswald',
    },
  },

  mobileDisplayNav: {
    display: 'flex',
    right: '0px',
    left: '0px',
  },

  mobileSidebar: {
    display: 'none',

    '@media (max-width: 870px)': {
      display: 'block',
    },
  },

  mobileLogo: {
    width: '260px',
    margin: '0 auto',
    padding: '0.5rem 0 0 4rem',
    display: 'none',

    '@media (max-width: 870px)': {
      display: 'block',
    },
  },

  hamburgerMenuContainer: {
    textAlign: 'right',
    margin: '0 0 0 auto',
    display: 'none',

    '& button': {
      width: '5px',
    },

    '@media (max-width: 870px)': {
      display: 'block',
    },
  },

  // have it as class but has no styling
  /*  hamburgerMenuBox: {
    background: 'red',
  }, */

  hamburgerMenuItem: {
    background: '#002B2B',
    color: 'white',
    width: '600px',
    height: '50px',

    '& p': {
      width: '100%',
      height: '100%',
    },

    '& p:hover': {
      fontWeight: 'bold',
      color: '#002B2B',
    },
  },

  closeHamburgerMenuImage: {
    marginLeft: '400px',

    '& img': {
      borderRadius: '10px',
      background: 'white',
    },
  },

  closeMobileMenu: {
    color: '#000000',
    width: '40px',
    height: '40px',
  },

  // landing page hero page
  heroPageHeader: {
    color: '#002B2B',
    display: 'flex',
    flexDirection: 'column',
    justContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    width: '40rem',
    margin: '0 0 0 2rem',

    '& h1': {
      fontSize: '380%',

      /* fontSize: 'calc(50%  5rem)', */

      '@media (max-width: 870px)': {
        fontSize: '6vw',
      },
    },

    '& p': {
      marginBottom: '1rem',
      lineHeight: 1.8,
      textAlign: 'left',
      padding: '1rem',
      fontSize: '1rem',
      color: '#002B2B',
    },

    '& a': {
      color: '#FFC745 ',

      borderRadius: 16,
      padding: '0rem 1.8rem',
      background: '#002B2B',
    },

    '@media (max-width: 870px)': {
      maxWidth: '100%',
      margin: '0',
    },
  },

  // category navigation on home page
  categorySectionHeader: {
    /* background: 'rgba(77, 115, 50, 0.2)', */
    backgroundColor: 'rgba(182, 242, 109, 1)',
    height: '100%',
    padding: '1rem 0rem',
    borderRadius: '5px',

    '& h2': {
      color: 'rgba(0, 43, 43, 1)',
      LineHeight: '53.35px',
      fontWeight: '500px',
      fontSize: '36px',
    },

    '& div': {
      height: '190px',
    },
  },

  // Landing page main product display section
  productPageHeader: {
    marginBottom: '1.2rem',
    fontWeight: 'bold',
    color: '#002B2B',
    fontSize: '2rem',
  },

  productDisplayContainer: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',

    '& h4': {
      fontSize: '1.2rem',

      '& strong': {
        marginLeft: '6px',
      },
    },
  },

  productPageButton: {
    margin: '0 auto',
    backgroundColor: '#002B2B',
    color: '#FFFFFF',
    fontWeight: 'bold',

    ':hover': {
      backgroundColor: '#DEC245',
      color: '#002B2B',
      transition: 'all 0.6s ease',
    },
  },

  // Carousel component
  carouselComponent: {
    textAlign: 'center',
    marginTop: '4rem',

    '& h2': {
      marginBottom: '1.2rem',
      fontWeight: 'bold',
      color: '#002B2B',
      fontSize: '2rem',
    },
  },

  carouselCardArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  carouselImage: {
    height: '20rem',

    '@media (max-width: 870px)': {
      height: 'initial',
    },
  },

  // Home page info section
  infoPageGrids: {
    paddingTop: '8rem',
    textAlign: 'center',
    padding: ' 2rem 2rem',
    width: '90%',
    margin: '0 auto',

    '& div p:first-child:first-of-type': {
      fontWeight: 'bold',
      color: '#AEB3B9',
    },

    '& div h2:first-of-type': {
      display: 'inline-block',
      fontWeight: 'bold',
      borderBottom: '4px solid #01C790',
      paddingBottom: '2rem',
      marginBottom: '2rem',
    },
  },

  farmersInfo: {
    width: '60%',
    minHeight: '60vh',
    margin: '0 auto',
    textAlign: 'center',

    '& h2': {
      marginBottom: '1.2rem',
      fontWeight: 'bold',
      color: '#002B2B',
      fontSize: '2rem',
    },

    '& div': {
      marginTop: 1,
    },

    '& div h3:first-of-type': {
      display: 'inline-block',
      fontWeight: 'bold',
      borderBottom: '4px solid #01C790',
      paddingBottom: '1rem',
      marginBottom: '2rem',
    },

    '@media (max-width: 870px)': {
      width: '80%',
    },
  },

  /* search page */
  searchPageProduct: {
    textAlign: 'center',
  },

  searchProductDisplayContainer: {
    textAlign: 'center',

    '& h4': {
      fontSize: '1.2rem',

      '& strong': {
        marginLeft: '6px',
      },
    },
  },

  /* Login page */
  loginLayoutStyle: {
    backgroundColor: 'rgba(182, 242, 109, 0.3)',
  },

  loginPageStyle: {
    maxWidth: '60%',
    height: '60vh',
    margin: '0 auto',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1rem',
    borderRadius: '40px',
    backgroundColor: '#FFFFFF',
    filter: 'drop-shadow(0 0 0.75rem green)',
    '@media (max-width: 960px)': {
      height: '160vh',
      maxWidth: '90%',
      marginTop: '20%',
    },
  },

  loginGrid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginPageImage: {
    width: '100%',
    height: '100%',
    textAlign: 'right',
    padding: '2rem 0 0 0',
  },

  loginFormContainer: {
    width: '100%',
    height: '100%',

    '& form': {
      textAlign: 'center',
      width: '100%',
      height: '100%',
    },
  },

  loginForm: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },

  loginFormTexts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& li': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  // registration and choose registeration
  chooseRegistration: {
    height: '60vh',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',

    '& h2': {
      color: '#002B2B',
      fontSize: '2rem',
    },
  },

  // shopping cart section
  cartContinueShopping: {
    '& h1': {
      fontSize: '1.5rem',
      display: 'inline',
    },
  },

  // single product image
  singleProductImage: {
    width: '84%',
  },

  singleProductImageGrid: {
    padding: 1,
    width: '80%',
  },

  centerAligned: {
    textAlign: 'center',
    fontSize: '2rem',
    marginTop: '3rem',
  },

  siteAdminStyle: {
    '& h2': {
      textAlign: 'center',

      marginBottom: '-1.2rem',
    },
  },

  // review section
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },

  // Map section
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    width: '250px',
  },

  // the navigation menu bar to change when scroling
  /* lowerNavigation: {
    width: '100%',
    height: '6.6rem',
    color: '#002B2B',
    position: 'fixed',
    left: 0,
    right: 0,
    transition: 'all 0.6s ease',
  },

  onScrollClassName: {
    background: '#002B2B',
    width: '100%',
    height: '6.6rem',

    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    transition: 'all 0.6s ease-in-out',

    '& h2': {
      color: '#FFFFFF',
    },
  }, */

  // other classes
  // footer
  footerButton: {
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    padding: '20px 0px',
  },

  // all the pages needs this for a better padding
  allPagesPadding: {
    paddingTop: '8rem',
    textAlign: 'center',
  },
};
export default classes;

/*





  // lowerNavigation: {
  //   width: '100%',
  //   height: '6.6rem',
  //   color: '#002B2B',
  //   position: 'fixed',
  //   left: 0,
  //   right: 0,
  //   transition: 'all 0.6s ease',
  // },

  // onScrollClassName: {
  //   background: '#002B2B',
  //   width: '100%',
  //   height: '6.6rem',

  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   zIndex: 10,
  //   transition: 'all 0.6s ease-in-out',

  //   '& h2': {
  //     color: '#FFFFFF',
  //   },
  // },

  // navMenu: {
  //   width: 'inherit',
  //   height: 'inherit',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   color: '#002B2B',

  //   '@media (max-width: 1230px)': {
  //     '& h2': {
  //       fontSize: '1rem',
  //     },
  //   },

  //   '@media (max-width: 870px)': {
  //     display: 'none',
  //   },
  // },

  // logo: {
  //   maxWidth: 260,
  // },

  // /*  searchBar: {
  //   '& input': {
  //   },
  // }, */

// navbarButtons: {
//   width: '40%',
//   height: 'inherit',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-around',
//   color: '#002B2B',

//   '& a': {
//     color: '#002B2B',
//     fontFamily: 'Oswald',
//   },
// },

// disableSwitch: {
//   display: 'none',
// },

//   '& a[href="/cart"]': { marginRight: 20 },

//   '& a[href="/login"]': {
//     background: '#77B050',
//     marginBottom: 10,
//     textAlign: 'center',
//     borderRadius: 5,

//     width: 108,
//     height: 30,
//   },

//   '& a[href="/register-type"]': {
//     background: '#77B050',
//     marginBottom: 10,

//     textAlign: 'center',
//     borderRadius: 5,

//     width: 108,
//     height: 30,
//   },
// },

// loggedInUserContainer: {
//   minWidth: '10rem',
//   marginLeft: '2rem',

//   '@media (max-width: 870px)': {
//     marginLeft: '0rem',
//   },
// },

// hideOnMobile: {
//   '@media (max-width: 870px)': {
//     display: 'none',
//   },
// },

// navbarButton: {
//   color: '#ffffff',
//   textTransform: 'initial',
//   fontSize: '1.2rem',

//   '@media (max-width: 870px)': {
//     fontSize: '1rem',
//   },
// },

// sideNavbarButton: {
//   color: '#002B2B',
//   width: 40,
//   height: 40,
// },

// cartIcon: {
//   width: 30,
// },

// profileIcon: {
//   marginRight: 5,
// },

// lineUp: {
//   color: '#FFFFFF',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: 40,
//   marginBottom: 10,
//   marginRight: 10,
// },

// heroPage: {
//   marginBottom: 20,
//   textAlign: 'center',
//   backgroundColor: 'rgba(182, 242, 109, 0.3)',

//   width: '100%',
//   minHeight: '100vh',

//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// },

// heroPageHeader: {
//   color: '#002B2B',
//   display: 'flex',
//   flexDirection: 'column',
//   justContent: 'center',
//   alignItems: 'center',
//   padding: '1rem',
//   width: '40rem',
//   margin: '0 0 0 2rem',

//   '& h1': {
//     fontSize: '380%',

//     /* fontSize: 'calc(50%  5rem)', */

//     '@media (max-width: 870px)': {
//       fontSize: '6vw',
//     },
//   },

//   '& p': {
//     marginBottom: '1rem',
//     lineHeight: 1.8,
//     textAlign: 'left',
//     padding: '1rem',
//     fontSize: '1rem',
//     color: '#002B2B',
//   },

//   '& a': {
//     color: '#FFC745 ',

//     borderRadius: 16,
//     padding: '0rem 1.8rem',
//     background: '#002B2B',
//   },

//   '@media (max-width: 870px)': {
//     maxWidth: '100%',
//     margin: '0',
//   },
// },

// brand: {
//   fontWeight: 'bold',
//   fontSize: '1.5rem',
// },

// grow: {
//   flexGrow: 1,
// },
// main: {
//   minHeight: '80vh',
// },

// section: {
//   marginTop: 20,
//   marginBottom: 20,
// },

// categorySection: {
//   width: '100%',
//   textAlign: 'center',
// },

// categorySectionHeader: {
//   /* background: 'rgba(77, 115, 50, 0.2)', */
//   backgroundColor: 'rgba(182, 242, 109, 1)',
//   height: '100%',
//   padding: '1rem 0rem',
//   borderRadius: 5,

//   '& h2': {
//     color: 'rgba(0, 43, 43, 1)',
//     LineHeight: 53.35,
//     fontWeight: 500,
//     fontSize: 36,
//   },

//   '& div': {
//     height: 190,
//   },
// },

// productPageHeader: {
//   marginBottom: '1.2rem',
//   fontWeight: 'bold',
//   color: '#002B2B',
//   fontSize: '2rem',
// },

// productDisplayContainer: {
//   width: '80%',
//   margin: '0 auto',
// },

// form: {
//   width: '100%',
//   /* textAlign: 'center', */
//   maxWidth: 800,
//   margin: '0 auto',
// },

// loginLayoutStyle: {
//   backgroundColor: 'rgba(182, 242, 109, 0.3)',
// },

// loginPageStyle: {
//   maxWidth: '60%',
//   height: '60vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: '#FFFFFF',
//   position: 'relative',
//   zIndex: 1,
//   marginTop: '2rem',
//   padding: '0 1rem',
//   borderRadius: 40,
//   margin: '0 auto',
//   marginTop: '10%',
//   filter: 'drop-shadow(0 0 0.75rem green)',

//   '@media (max-width: 960px)': {
//     height: '160vh',
//     maxWidth: '90%',
//     marginTop: '20%',
//   },
// },

// loginGrid: {
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// loginPageImage: {
//   width: '100%',
//   height: '100%',
//   textAlign: 'right',
// },

// loginFormContainer: {
//   width: '100%',
//   height: '100%',

//   '& form': {
//     textAlign: 'center',
//     width: '100%',
//     height: '100%',
//   },
// },

// loginFormTexts: {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',

//   '& li': {
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// },

// transparentBackground: {
//   background: 'transparent',
// },

// error: {
//   color: '#F04040',
// },

// fullWidth: {
//   width: '100%',
// },

// siteAdminStyle: {
//   '& h2': {
//     textAlign: 'center',

//     marginBottom: '-1.2rem',
//   },
// },

// chooseRegistration: {
//   height: '60vh',
//   display: 'flex',
//   textAlign: 'center',
//   alignItems: 'center',

//   '& h2': {
//     color: '#002B2B',
//     fontSize: '2rem',
//   },
// },

// centerAligned: {
//   textAlign: 'center',
//   fontSize: '2rem',
//   marginTop: '3rem',
// },

// cartContinueShopping: {
//   '& h1': {
//     fontSize: '1.5rem',
//     display: 'inline',
//   },
// },

// footer: {
//   padding: '1rem',
//   marginTop: 60,
//   color: '#FFFFFF',
//   backgroundColor: '#002B2B',

//   '& span p:last-of-type': {
//     textAlign: 'center',
//   },

//   '& input': {
//     borderRadius: 16,
//     marginRight: 5,
//     border: '2px solid white',
//     height: '6px',
//   },
// },

// footerSocialIcons: {
//   paddingTop: '0.5rem',
//   width: 200,
//   display: 'flex',
//   justifyContent: 'space-around',
//   alignItems: 'center',
// },

// icons: {
//   width: 20,
// },

// footerButton: {
//   background: 'transparent',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// formInputContainer: {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: 80,
//   padding: '20px 0px',
// },

// mobileDisplayNav: {
//   display: 'flex',
//   right: 0,
//   left: 0,
// },

// mobileLogo: {
//   width: 260,
//   margin: '0 auto',
//   padding: '0.5rem 0 0 4rem',
//   display: 'none',

//   '@media (max-width: 870px)': {
//     display: 'block',
//   },
// },

// mobileSidebar: {
//   display: 'none',

//   '@media (max-width: 870px)': {
//     display: 'block',
//   },
// },

// hamburgerMenuContainer: {
//   textAlign: 'right',
//   margin: '0 0 0 auto',
//   display: 'none',

//   '& button': {
//     width: '5px',
//   },

//   '@media (max-width: 870px)': {
//     display: 'block',
//   },
// },

// closeHamburgerMenuImage: {
//   marginLeft: 400,

//   '& img': {
//     borderRadius: 10,
//     background: 'white',
//   },
// },

// hamburgerMenuItem: {
//   background: '#002B2B',
//   color: 'white',
//   width: '600px',
//   height: '50px',

//   '& p': {
//     width: '100%',
//     height: '100%',
//   },

//   '& p:hover': {
//     fontWeight: 'bold',
//     color: '#002B2B',
//   },
// },

// infoPageStyles: {
//   margin: '2rem 0',
//   width: '100%',
// },

// infoPageGrids: {
//   paddingTop: '8rem',
//   textAlign: 'center',
//   padding: ' 2rem 2rem',
//   width: '90%',
//   margin: '0 auto',

//   '& div p:first-child:first-of-type': {
//     fontWeight: 'bold',
//     color: '#AEB3B9',
//   },

//   '& div h2:first-of-type': {
//     display: 'inline-block',
//     fontWeight: 'bold',
//     borderBottom: '4px solid #01C790',
//     paddingBottom: '2rem',
//     marginBottom: '2rem',
//   },
// },

// farmersInfo: {
//   width: '60%',
//   minHeight: '60vh',
//   margin: '0 auto',
//   textAlign: 'center',

//   '@media (max-width: 870px)': {
//     width: '80%',
//   },
// },

// reviewForm: {
//   maxWidth: 800,
//   width: '100%',
// },

// reviewItem: {
//   marginRight: '1rem',
//   borderRight: '1px #808080 solid',
//   paddingRight: '1rem',
// },

// reviewsContainer: {
//   marginTop: '2rem',
//   maxWidth: '60%',
//   margin: '0 auto',
// },

// alignItemsCenter: {
//   textAlign: 'center',
//   /* not working yet */
// },

// navbarButtonOnScroll: {
//   color: '#FFFFFF',
//   width: 40,
//   height: 40,
// },

// closeMobileMenu: {
//   color: '#000000',
//   width: 40,
//   height: 40,
// },

// componentTopMargin: {
//   marginTop: '1rem',
// },

// searchForm: {
//   border: '1px solid #FFFFFF',
//   backgroundColor: '#FFFFFF',
//   borderRadius: 4,
// },

// searchInput: {
//   paddingLeft: 5,
//   color: '#000000',

//   '& ::placeholder': {
//     color: '#606060',
//   },
// },

// iconButton: {
//   backgroundColor: '#002B2B',
//   padding: 5,
//   borderRadius: '0 4px 4px 0',

//   '& span': {
//     color: '#FFFFFF',

//     '& :hover': {
//       color: '#000000',
//     },
//   },
// },

// sort: {
//   marginRight: 5,
// },

// // Carousel component
// carouselComponent: {
//   textAlign: 'center',
//   marginTop: '4rem',

//   '& h2': {
//     marginBottom: '1.2rem',
//     fontWeight: 'bold',
//     color: '#002B2B',
//     fontSize: '2rem',
//   },
// },

// carouselCardArea: {
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// carouselImage: {
//   height: '20rem',

//   '@media (max-width: 870px)': {
//     height: 'initial',
//   },
// },

// // all the pages needs this for a better padding
// allPagesPadding: {
//   paddingTop: '6rem',
//   textAlign: 'center',
// },
