import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

type Props = { loggedIn: boolean };

export default function Home(props: Props) {
  return (
    <Layout loggedIn={props.loggedIn} page="home">
      <Head>
        <title>Plan Trip</title>
      </Head>
      <div className="indexPic">
        <Link href="/planTrip">
          <a>
            <button className="indexButton">Start</button>
          </a>
        </Link>
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
