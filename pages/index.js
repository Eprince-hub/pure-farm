import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import FeaturedProductSlides from '../components/FeaturedProductSlides';
import HeroPage from '../components/HeroPage';
import LandingPageInfoDisplay from '../components/LandingPageInfoDisplay';
import Layout from '../components/Layout';
import Product from '../models/Product';
import User from '../models/User';
import styles from '../styles/Home.module.css';
// import useStyles from '../utils/styles';
import classes from '../utils/classes';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home(props) {
  const router = useRouter();

  // getting the react context from useContext
  const { state, dispatch } = useContext(Store);

  // function for adding item to the cart
  const addToCartHandler = async (product) => {
    // Getting the current quantity of the item
    const existItem = state.cart.cartItems.find(
      (item) => item._id === product._id,
    );

    const quantity = existItem ? existItem.quantity + 1 : 1; // dispatching an action to the react context

    // Getting the product from the backend using axios
    const { data } = await axios.get(`/api/products/${product._id}`);

    // checking if product is in stock before adding to the cart
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });

    // redirect user to the cart page

    router.push('/cart');
  };

  // const classes = useStyles();
  const { products, featuredProducts } = props;

  // The code bellow fixed the window undefined error that i get when i render the carousel component here, it enables the component to load only when window becomes defined => fixed a 30 mins bug!.
  const [windowDefined, setWindowDefined] = useState(false);
  useEffect(() => {
    const defineWindow = () => {
      if (window === undefined) {
        return;
      } else {
        setWindowDefined(true);
      }
    };
    defineWindow();
  }, []);

  return (
    <Layout title="Home Page">
      <section>
        <div>
          <HeroPage />
          <CategoryNavigation />
        </div>
        <div>
          <Typography
            variant="h3"
            align="center"
            sx={classes.productPageHeader}
          >
            Fresh From Farm
          </Typography>
        </div>
        <Box sx={classes.productDisplayContainer}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product._id}>
                <Box>
                  <Card raised style={{ height: '100%' }}>
                    <NextLink href={`/product/${product.slug}`} passHref>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={product.image}
                          title={product.name}
                        ></CardMedia>
                        <CardContent>
                          <Typography>
                            <strong>{product.name}</strong>
                          </Typography>

                          <Rating
                            value={Number(product.rating)}
                            readOnly
                          ></Rating>
                        </CardContent>
                      </CardActionArea>
                    </NextLink>

                    <Typography variant="h4" component="h4">
                      €<strong>{product.price}</strong>
                    </Typography>

                    <CardActions>
                      <Button
                        sx={classes.productPageButton}
                        size="small"
                        color="primary"
                        onClick={() => addToCartHandler(product)}
                      >
                        Collect Box
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <div>
          {/* render this component only when window is defined,, => fixed window undefined error */}
          {windowDefined ? (
            <FeaturedProductSlides featuredProducts={featuredProducts} />
          ) : (
            []
          )}
        </div>

        <LandingPageInfoDisplay farmers={props.farmers ? props.farmers : []} />
      </section>
    </Layout>
  );
}

// ###################
// Get product from the backend / database

export async function getServerSideProps() {
  // connecting to DB database;
  await db.connect();

  const ratedProducts = await Product.find({}, '-reviews')
    .lean()
    .sort({ countInStock: -1, createdAt: -1 })
    .limit(6);

  // getting the featured products
  const featuredProducts = await Product.find({}, '-reviews')
    .lean()
    .sort({ rating: -1 })
    .limit(6);

  // console.log('featured products: ', featuredProducts);

  // getting the farmers information
  const farmers = await User.find({ isAdmin: true }).lean().limit(4);

  // disconnect from the database
  await db.disconnect();

  return {
    props: {
      // calling the convert to doc function on each product that is returned from the database

      products: ratedProducts.map(db.convertDocToObj),
      farmers: farmers.map(db.convertDocToObj),
      featuredProducts: featuredProducts.map(db.convertDocToObj),
    },
  };
}
