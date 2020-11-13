import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import React, { useState } from 'react';

export default function maxDistance(props) {
  const [distance, setDistance] = useState(0);
  const [cities, setCities] = useState([]);
  async function getCities() {
    const getPromiseCities = await fetch(
      'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/48.2030964+16.3851084/nearbyCities?radius=100000&limit=10&minPopulation=1000000',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '0cf8229241msh121566db8780254p144dfdjsnfc37d01888ca',
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      },
    );
    const getObject = await getPromiseCities.json();
    console.log('getObject', getObject);
    const draft = getObject.data;
    console.log('draft', draft);
    const newCityList = getObject.data.filter((item) => item.type === 'CITY');
    console.log('newCityList', newCityList);
    setCities(newCityList);
  }
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Maximum Distance</title>
      </Head>
      <main>
        <input
          type="text"
          id="distance"
          placeholder="Enter distance"
          // className="bottomText"
          onChange={(event) => setDistance(event.currentTarget.value)}
        />
        <br />
        <button onClick={getCities}>Get Cities</button>
        <ul className="tripWishListCities">
          {cities.map((item) => (
            <li>{item.city}</li>
          ))}
          {/* (
            <li>{item.city}</li>
          ) */}
          {/* <li>{cities?.[0]?.city}</li> */}
        </ul>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  return {
    props: { loggedIn: await isSessionTokenValid(token) },
  };
}
