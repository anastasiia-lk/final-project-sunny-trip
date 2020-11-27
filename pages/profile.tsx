import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Layout from '../components/Layout';
import { getUserBySessionToken } from '../util/database';
import { User } from '../util/types';
import { useState } from 'react';
import { Router } from 'next/router';
import { useRouter } from 'next/router';

export default function Profile(props: { user: User; loggedIn: boolean }) {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(props.user?.firstName);
  const [lastName, setLastName] = useState(props.user?.lastName);
  const [userWishList, setUserWishList] = useState([]);
  // const [delTripId, setTripId] = useState('');
  // const [delTripDate, setdelTripDate] = useState('');
  // const [delTripCity, setdelTripCity] = useState('');
  // const [delTripCountry, setdelTripCountry] = useState('');

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

      {/* <h2>Username</h2>
      <p>{props.user.username}</p> */}
      <main>
        <div className="profileWrap">
          <div className="profileBlock">
            <div className="profileBlock">
              <div className="profileTextSmall">Hello,</div>
              <div className="profileTextHello">
                {/* Hello, */}
                {'     '}
                {lastName}
                {'     '}
                {firstName}
              </div>
            </div>
            <div className="profileBlockEdit1">
              {/* user id: {props.user.id} */}
              <br />
              {/* {!props.user.firstName ? (
                <div className="profileText">user firstName</div>
              ) : (
                <div className="profileText">user {props.user.firstName}</div>
              )} */}
              {/* <h2>user {props.user.firstName}</h2> */}
              {editingKey === 'firstName' ? (
                <input
                  className="profileInput"
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              ) : (
                <div className="profileFont">
                  Click to change the first name
                </div>
              )}{' '}
              {editingKey !== 'firstName' ? (
                <button
                  onClick={() => {
                    setEditingKey('firstName');
                  }}
                  className="checkedProfileData"
                >
                  Edit
                </button>
              ) : (
                <>
                  <div className="profileWrapButtons">
                    <button
                      onClick={async () => {
                        await fetch(`/api/users/${props.user.id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            user: { firstName: firstName },
                          }),
                        });
                        setEditingKey(null);
                        setFirstName(firstName);
                      }}
                      className="checkedProfileData"
                    >
                      Save
                    </button>{' '}
                    <button
                      onClick={() => {
                        setEditingKey(null);
                        setFirstName(props.user.firstName);
                      }}
                      className="checkedProfileData"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="profileBlockEdit2">
              {/* <br />
              {!props.user.lastName ? (
                <div className="profileText">user lastName</div>
              ) : (
                <div className="profileText">user {props.user.lastName}</div>
              )} */}
              {editingKey === 'lastName' ? (
                <input
                  className="profileInput"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              ) : (
                <div className="profileFont">Click to change the last name</div>
              )}{' '}
              {editingKey !== 'lastName' ? (
                <button
                  onClick={() => {
                    setEditingKey('lastName');
                  }}
                  className="checkedProfileData"
                >
                  Edit
                </button>
              ) : (
                <>
                  <div className="profileWrapButtons">
                    <button
                      onClick={async () => {
                        await fetch(`/api/users/${props.user.id}`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            user: { lastName: lastName },
                          }),
                        });
                        setEditingKey(null);
                        setLastName(lastName);
                      }}
                      className="checkedProfileData"
                    >
                      Save
                    </button>{' '}
                    <button
                      onClick={() => {
                        setEditingKey(null);
                        setLastName(props.user.lastName);
                      }}
                      className="checkedProfileData"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <br />
            <br />
            <div className="profileBlockNav">
              <button
                className="checkedProfileData"
                onClick={async () => {
                  const answer = window.confirm(
                    `Really delete user ${props.user.firstName} ${props.user.lastName}?`,
                  );

                  if (answer === true) {
                    await fetch(`/api/users/${props.user.id}`, {
                      method: 'DELETE',
                    });

                    // This is just a fast way of refreshing the information
                    //
                    // A better version would be to save the props.user to a
                    // separate state variable and then just set it here to null
                    window.location.reload();
                  }
                }}
                // style={{
                //   background: 'red',
                //   color: 'white',
                //   padding: '7px 6px',
                //   borderRadius: 4,
                //   border: 0,
                // }}
              >
                Delete user
              </button>
              <br />
              <br />
              <div className="profileWrapButtons">
                <button
                  className="profileButton"
                  onClick={async (e) => {
                    e.preventDefault();
                    const response = await fetch('/api/trips');
                    const userTrips = await response.json();
                    setUserWishList(userTrips);
                    // setStep(4);
                  }}
                  // onClick={() => setSelectedCity(item)}
                  // onClick={getCheckedCity(item)}
                >
                  Show My Trips
                </button>
                <button
                  className="profileButton"
                  onClick={() => {
                    router.push('/startingPoint');
                  }}
                  // onClick={() => setSelectedCity(item)}
                  // onClick={getCheckedCity(item)}
                >
                  Start new search
                </button>
              </div>
            </div>
          </div>
          <div className="profileBlockList">
            <ul>
              {userWishList.map((item) => (
                <li className="liStyleWeather">
                  <button
                    className="checkedProfile"
                    onClick={async () => {
                      const answer = window.confirm(
                        `Really delete trip ${item.city}, ${item.country}?`,
                      );

                      if (answer === true) {
                        await fetch(`/api/trips/${item.id}`, {
                          method: 'DELETE',
                        });
                        const response = await fetch('/api/trips');
                        const userTrips = await response.json();
                        setUserWishList(userTrips);

                        // This is just a fast way of refreshing the information
                        //
                        // A better version would be to save the props.user to a
                        // separate state variable and then just set it here to null
                        // window.location.reload();
                      }
                    }}
                  >
                    Delete
                  </button>
                  {'🚩'}
                  {item.city}
                  {'  '}
                  {item.country}
                  {'   '}
                  {'   '}
                  {'   '}
                  {'📅'}
                  {'  '}
                  {item.date}
                  {'🌡'} {'  '}
                  {item.temp}°C {'📝'}
                  {'  '}
                  {item.long}
                  {'  '}
                </li>
              ))}
            </ul>
          </div>
        </div>
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

  return {
    props: {
      user,
      // user: { id: user.id, firstName: user.firstName, lastName: user.lastName },
      loggedIn: await isSessionTokenValid(token),
    },
  };
}
