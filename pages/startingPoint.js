import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

export default function StartingPoint(props) {
  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const getPromise = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCjtpIUFEUc6gX-dhpHaDX4BzdkNtUQ28w`,
        );
        const getObject = await getPromise.json();
        const print = getObject.results[2].address_components[3].long_name;
        console.log('Printget', print);

        const getCitiesPromise = await fetch(
          `https://wft-geo-db.p.rapidapi.com//v1/geo/locations/+48.203161099999996+16.3850746/nearbyCities?limit=5&offset=0&radius=100`,
        );
        const getCitiesPromiseObject = await getCitiesPromise.json();
        console.log('getCitiesPromiseObject', getCitiesPromiseObject);
      },
      (err) => console.log(err),
    );
  }
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Plan Trip</title>
      </Head>
      <main>
        <div className="planTrip">
          <button className="planTripItem1">Starting point</button>
          <button className="planTripItem2">Trip date</button>
          <button className="planTripItem3">Maximum distance</button>
          <button className="planTripItem4">Weather forecast</button>
        </div>
        <div className="planTripButton">
          <button>Next Step</button>
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
