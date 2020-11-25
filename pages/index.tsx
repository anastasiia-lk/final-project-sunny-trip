import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { useRouter } from 'next/router';

type Props = { loggedIn: boolean };

export default function Home(props: Props) {
  const router = useRouter();
  return (
    <Layout loggedIn={props.loggedIn} page="home">
      <Head>
        <title>Plan Trip</title>
      </Head>
      <div className="indexFlex">Make your trip a</div>
      <div className="indexFlexBig">Sunny Trip</div>
      <div className="indexFlexSmall">
        Plan you trip <br /> based on preferred
        <br />
        weather forecast
      </div>
      <div className="indexPic">
        <button
          className="indexButton"
          data-cy="index-button"
          onClick={async (e) => {
            e.preventDefault();
            router.push('/planTrip');
          }}
        >
          I want to plan my trip
        </button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  return {
    props: { loggedIn: await isSessionTokenValid(token) },
  };
}
