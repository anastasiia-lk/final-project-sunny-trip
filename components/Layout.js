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
      <Header loggedIn={props.loggedIn} step={props.step} />
      <main
        style={
          props.page === 'home'
            ? {
                padding: 220,
                backgroundImage: 'url(' + '/background.jpg' + ')',
                backgroundPosition: 'right 35% bottom',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }
            : { padding: 260, background: 'seashell' }
        }
      >
        {/* 'https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' */}
        {props.children}
      </main>
      <Footer />
    </>
  );
}
