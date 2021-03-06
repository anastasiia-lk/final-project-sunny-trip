import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import React, { useState } from 'react';

export default function maxDistance(props) {
  const [distance, setDistance] = useState(0);
  const [population, setPopulation] = useState(0);
  const [cities, setCities] = useState([]);
  const [checkedCity, setCheckedCity] = useState('');
  async function getCities() {
    const getPromiseCities = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/48.2030964+16.3851084/nearbyCities?radius=${distance}&limit=10&minPopulation=${population}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'key',
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
  function getCheckedCity(item) {
    // setCheckedCity(item);
    // console.log(item);
    console.log('props.latcur', props.latcur);
  }
  return (
    <Layout loggedIn={props.loggedIn} page="step2">
      <Head>
        <title>Maximum Distance</title>
      </Head>
      <main>
        <div className="location">
          <input
            className="indexLocationItem1"
            type="text"
            id="distance"
            placeholder="Enter distance (km)"
            // className="bottomText"
            onChange={(event) => setDistance(event.currentTarget.value)}
          />
          <input
            className="indexLocationItem1"
            type="text"
            id="population"
            placeholder="Enter population"
            // className="bottomText"
            onChange={(event) => setPopulation(event.currentTarget.value)}
          />
          <br />
          <button className="indexButton" onClick={getCities}>
            Get Cities
          </button>
          <ul className="tripWishListCities">
            {cities.map((item) => (
              <li>
                {item.city}
                {'             '}

                <button className="checkedCity" onClick={getCheckedCity(item)}>
                  Check
                </button>
                {/* <input
                type="checkbox"
                onChange={(event) => checkedCity(item)}
              ></input> */}
              </li>
            ))}
            {/* (
            <li>{item.city}</li>
          ) */}
            {/* <li>{cities?.[0]?.city}</li> */}
          </ul>
          <div className="locationButtonBox">
            <Link href="/tripDate">
              <a>
                <button className="locationButton">Back</button>
              </a>
            </Link>
            <Link href="/weatherForecast">
              <a>
                <button className="locationButton">Next</button>
              </a>
            </Link>
            <button className="locationButton" onClick={getCheckedCity}>
              Check
            </button>
          </div>
        </div>
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
