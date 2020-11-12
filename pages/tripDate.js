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
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Plan Trip Date</title>
      </Head>
      <main>
        <div>Select Trip Date</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        >
          <div style={{ color: 'red' }}>Don't forget to check the weather!</div>
        </DatePicker>
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
