import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

const AnyReactComponent = ({ text }) => (
  <div
    style={{ width: '120', height: '120', borderRadius: '50%', color: 'red' }}
  >
    {text}
  </div>
);

export default function startingPoint(props) {
  const key_google_maps = process.env.REACT_APP_WEATHER_APP_API_KEY;
  const [latcur, setlatcur] = useState(59.95);
  const [lngcur, setlngcur] = useState(30.33);
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const newLatcur = position.coords.latitude;
        const newLngcur = position.coords.longitude;
        setlatcur(newLatcur);
        setlngcur(newLngcur);
      },
      (err) => console.log(err),
    );
  }
  return (
    // Important! Always set the container height explicitly
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Plan Trip</title>
      </Head>
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key_google_maps }}
          defaultCenter={{
            lat: latcur,
            lng: lngcur,
          }}
          defaultZoom={1}
        >
          <AnyReactComponent lat={latcur} lng={lngcur} text={'📍'} />
        </GoogleMapReact>

        <button
          className="indexButton"
          onClick={getLocation}
          style={{ height: 100, weight: 1000 }}
        >
          Get My Current Location
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  return {
    props: { loggedIn: await isSessionTokenValid(token) },
  };
}
