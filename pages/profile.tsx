import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';
import { getUserBySessionToken } from '../util/database';
import { User } from '../util/types';
import { useState } from 'react';

export default function Profile(props: { user: User; loggedIn: boolean }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  if (!props.user) {
    return (
      <Layout>
        <Head>
          <title>User not found</title>
        </Head>
        User not found.
      </Layout>
    );
  }
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Profile</title>
      </Head>

      <h1>Profile</h1>

      <h2>First Name</h2>
      <p>{props.user.lastName}</p>

      <h2>Username</h2>
      <p>{props.user.username}</p>
      <main>
        user id: {props.user.id}
        <br />
        {!props.user.firstName ? (
          <h2>user firstName</h2>
        ) : (
          <h2>user {props.user.firstName}</h2>
        )}
        {/* <h2>user {props.user.firstName}</h2> */}
        {editingKey === 'firstName' ? (
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.currentTarget.value)}
          />
        ) : (
          firstName
        )}{' '}
        {editingKey !== 'firstName' ? (
          <button
            onClick={() => {
              setEditingKey('firstName');
            }}
          >
            edit
          </button>
        ) : (
          <>
            <button
              onClick={async () => {
                await fetch(`/api/users/${props.user.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user: { firstName: firstName } }),
                });
                setEditingKey(null);
              }}
            >
              save
            </button>{' '}
            <button
              onClick={() => {
                setEditingKey(null);
                setFirstName(props.user.firstName);
              }}
            >
              cancel
            </button>
          </>
        )}
        <br />
        {!props.user.lastName ? (
          <h2>user lastName</h2>
        ) : (
          <h2>user {props.user.lastName}</h2>
        )}
        {editingKey === 'lastName' ? (
          <input
            value={lastName}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
        ) : (
          lastName
        )}{' '}
        {editingKey !== 'lastName' ? (
          <button
            onClick={() => {
              setEditingKey('lastName');
            }}
          >
            edit
          </button>
        ) : (
          <>
            <button
              onClick={async () => {
                await fetch(`/api/users/${props.user.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user: { lastName: lastName } }),
                });
                setEditingKey(null);
              }}
            >
              save
            </button>{' '}
            <button
              onClick={() => {
                setEditingKey(null);
                setLastName(props.user.lastName);
              }}
            >
              cancel
            </button>
          </>
        )}
        <br />
        <br />
        <button
          onClick={async () => {
            const answer = window.confirm(
              `Really delete user ${props.user.firstName} ${props.user.lastName}?`,
            );

            if (answer === true) {
              await fetch(`/api/users/${props.user.id}`, { method: 'DELETE' });

              // This is just a fast way of refreshing the information
              //
              // A better version would be to save the props.user to a
              // separate state variable and then just set it here to null
              window.location.reload();
            }
          }}
          style={{
            background: 'red',
            color: 'white',
            padding: '7px 6px',
            borderRadius: 4,
            border: 0,
          }}
        >
          delete user
        </button>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/profile',
        permanent: false,
      },
    };
  }

  // TODO: Actually, you could do this with one query
  // instead of two like done here
  const user = await getUserBySessionToken(token);

  return { props: { user, loggedIn: await isSessionTokenValid(token) } };
}
