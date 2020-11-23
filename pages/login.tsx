import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';

type Props = { loggedIn: boolean; redirectDestination: string };

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Sunny Trip</title>
      </Head>
      <main>
        <div className="indexLocation">
          <form
            className="indexLocation"
            onSubmit={async (e) => {
              e.preventDefault();

              const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              });

              const { success } = await response.json();

              if (!success) {
                setErrorMessage('Login failed!');
              } else {
                setErrorMessage('');
                router.push(props.redirectDestination);
              }
            }}
          >
            <input
              className="indexLocationItem1"
              type="text"
              placeholder="Username"
              value={username}
              data-cy="username"
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              className="indexLocationItem2"
              type="text"
              placeholder="Password"
              value={password}
              data-cy="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button className="indexLocationItem3" data-cy="login">
              Login
            </button>
          </form>
          <p style={{ color: 'red' }}>{errorMessage}</p>
          <Link href="/registration">
            <button className="indexLocationItem4">Registration</button>
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  const redirectDestination = context?.query?.returnTo ?? '/profile';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn: false, redirectDestination: redirectDestination },
  };
}
