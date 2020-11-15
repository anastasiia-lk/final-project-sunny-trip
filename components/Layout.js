import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
// import homePic from './homePic.jpg';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedIn={props.loggedIn} page={props.page} />
      <main
        style={
          props.page === 'home'
            ? {
                padding: 260,
                backgroundImage: 'url(' + '/sunny-1.jpg' + ')',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }
            : { padding: 260, background: 'seashell' }
        }
      >
        {/* 'https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' */}
        {props.children}
      </main>
      <Footer page={props.page} />
    </>
  );
}
