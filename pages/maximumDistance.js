import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

export default function StartingPoint(props) {
  return (
    <Layout loggedIn={props.loggedIn} page="step2">
      <Head>
        <title>Maximum Distance</title>
      </Head>
      <main>
        <div className="planTrip">
          <button className="planTripItem1">Starting point</button>
          <button className="planTripItem2">Trip date</button>
          <button className="planTripItem3">Maximum distance</button>
          <button className="planTripItem4">Weather forecast</button>
        </div>
        <div className="planTripButton">
          <button>Plan My Trip</button>
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
