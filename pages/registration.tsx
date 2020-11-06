import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Registration(props: { token: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Registration</title>
      </Head>
      <main>
        <form
          className="registrationLocation"
          onSubmit={async (e) => {
            // Prevent the default browser behavior of forms
            e.preventDefault();

            // Send the username, password and token to the
            // API route
            const response = await fetch('/api/registration', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
                token: props.token,
              }),
            });

            const { success } = await response.json();

            if (success) {
              // Redirect to the homepage if successfully registered
              router.push('/');
            } else {
              // If the response status code (set using response.status()
              // in the API route) is 409 (Conflict) then show an error
              // message that the user already exists
              if (response.status === 409) {
                setErrorMessage('User already exists!');
              } else {
                setErrorMessage('Failed!');
              }
            }
          }}
        >
          <input
            className="registrationLocationItem1"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            className="registrationLocationItem2"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="registrationLocationItem3"> Registration </button>
        </form>
        <p style={{ color: 'red' }}>{errorMessage}</p>

        {/* <Link href="/login">
        <a>Login</a>
      </Link> */}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  return { props: { token } };
}

// export function getServerSideProps() {
//   // if (user is logged in true){
//   return {
//     redirect: {
//       permanent: false,
//       destination: './login',
//     },
//   };
//   // }
//   return { props: {} };
// }
