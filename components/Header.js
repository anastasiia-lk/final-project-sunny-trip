import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <header className="headerStyle">
      <div className="headerPicsBlock">
        <Link href="/">
          <a className="logo">
            <img src="/logo.png" alt="Logo" />
          </a>
        </Link>
      </div>
      <div className="headerTitle">Make your trip Sunny Trip</div>
      <div className="headerPicsBlock">
        <Link href="/">
          <a className="headerPics">
            <img src="/home.png" alt="Home page" />
            Home
          </a>
        </Link>
        {!loggedInPassed ? null : props.loggedIn ? (
          <Link href="/logout">
            <a className="headerPics">
              <img src="/logout.jpg" alt="Log out" />
              Log out
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="headerPics">
              <img src="/login.png" alt="Log in" />
              Log in
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
