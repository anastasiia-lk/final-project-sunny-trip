import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
// import homePic from './homePic.jpg';

export default function Layout(props) {
  return (
    <div className="wrapper">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header loggedIn={props.loggedIn} step={props.step} />
      <main
        style={
          props.page === 'home'
            ? {
                // paddingTop: '10vh',
                paddingLeft: '10vw',
                backgroundImage: 'url(' + '/background.jpg' + ')',
                backgroundPosition: 'right 55% bottom',
                // backgroundPosition: 'right 15% bottom 15%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                overflowY: 'hidden',
                paddingBottom: '0px',
              }
            : {
                // paddingTop: '10vh',
                paddingLeft: '10vw',
                backgroundImage: 'url(' + '/backgroundReg.jpg' + ')',
                backgroundPosition: 'right 35% bottom',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
              }
        }
      >
        {/* 'https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350' */}
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
