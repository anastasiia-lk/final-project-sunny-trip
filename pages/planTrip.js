import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

export default function PlanTrip(props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Plan Trip</title>
      </Head>
      <main>
        <div className="location">
          <div className="dateText">Plan your trip with 3 short steps:</div>
          <div className="planTrip">
            <button className="planTripItem1" data-cy="plan-trip-step-1">
              Step 1:<br></br>
              <br></br> Starting point
            </button>
            <button className="planTripItem4" data-cy="plan-trip-step-2">
              Step 2:<br></br>
              <br></br> Maximum distance
            </button>
            <button className="planTripItem3" data-cy="plan-trip-step-3">
              Step 3:<br></br>
              <br></br> Weather forecast
            </button>
          </div>
          <Link href="/startingPoint">
            <a>
              <button className="indexButton">Plan My Trip</button>
            </a>
          </Link>
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
