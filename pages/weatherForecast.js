import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <main>
        <div className="tripWishList">
          <div>Sunny weather forecast</div>
        </div>
        <ul className="tripWishListCities">
          <li>City_1</li>
          <li>City_2</li>
          <li>City_3</li>
          <li>City_4</li>
          <li>City_5</li>
        </ul>
      </main>
    </Layout>
  );
}
