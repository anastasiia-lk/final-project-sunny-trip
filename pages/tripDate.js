import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

export default function tripDate(props) {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Layout loggedIn={props.loggedIn} page="step1">
      <Head>
        <title>Trip Date</title>
      </Head>
      <main>
        <div className="location">
          <div className="dateText">Select Trip Date</div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          >
            <div style={{ color: 'red' }}>
              Don't forget to check the weather!
            </div>
          </DatePicker>
          <div className="locationButtonBox">
            <Link href="/startingPoint">
              <a>
                <button className="locationButton">Back</button>
              </a>
            </Link>
            <Link href="/maxDist">
              <a>
                <button className="locationButton">Next</button>
              </a>
            </Link>
          </div>
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
