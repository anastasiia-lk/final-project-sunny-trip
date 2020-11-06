import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
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
          <button>Plan My Trip</button>
        </div>
      </main>
    </Layout>
  );
}
