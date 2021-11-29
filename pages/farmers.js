import { Grid, Link, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useContext } from 'react';
import FarmerHeroPage from '../components/FarmerHeroPage';
import Layout from '../components/Layout';
import User from '../models/User';
import styles from '../styles/Home.module.css';
// import useStyles from '../utils/styles';
import classes from '../utils/classes';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Farmers(props) {
  // getting the react context from useContext
  const { state } = useContext(Store);

  // make condition to make sure that only logged in users can view this page

  // const classes = useStyles();

  const { adminUsers } = props;

  return (
    <Layout title="farmers">
      <div>
        <FarmerHeroPage />
        <section>
          <div className={styles.farmerPageHeader}>
            <Typography variant="h3" align="center">
              Know Where Your Food Is Coming From
            </Typography>
          </div>
          <div>
            <Grid container spacing={2}>
              {adminUsers.map((adminUser) => (
                <Grid item md={4} xs={12} key={adminUser._id}>
                  <div>
                    <Image
                      src={adminUser.image}
                      alt={adminUser.name}
                      component="responsive"
                      width={400}
                      height={400}
                    ></Image>
                  </div>

                  <div>
                    <NextLink href="/market" passHref>
                      <Link>
                        <Typography>{adminUser.name}</Typography>
                      </Link>
                    </NextLink>
                  </div>

                  <div>Joined Since: {adminUser.createdAt.slice(0, 16)}</div>
                </Grid>
              ))}
            </Grid>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // connecting to DB database;
  await db.connect();

  // Getting the products from the database;
  // we use lean object from mongoose to transform
  // the data back to a javascript object just like
  // JSON.stringify because mongoose always returns
  // Mongoose document from the database.
  // const products = await Product.find({}).lean();
  const adminUsers = await User.find({ isAdmin: true }).lean();

  // disconnect from the database
  await db.disconnect();

  return {
    props: {
      // calling the convert to doc function on each product that is returned from the database
      // and pass the value to the products
      // this stops the id errors from this function
      // because of the mongo document model.
      // products: products.map(db.convertDocToObj),
      adminUsers: adminUsers.map(db.convertDocToObj),
    },
  };
}
