import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <header className="headerWrap">
      <div className="headerStyle">
        <div className="headerPicsBlock">
          <Link href="/">
            <a>
              <img src="/logo.png" alt="Logo" />
            </a>
          </Link>
        </div>
        <Link href="/">
          <a className="headerPics">Home</a>
        </Link>
        <Link href="/planTrip">
          <a className="headerPics">How it works</a>
        </Link>
        <Link href="/">
          <a className="headerPics">Contact</a>
        </Link>
        {/* <div className="headerPicsBlock"> */}
        {/* <Link href="/">
            <a className="headerPics">
              <img src="/home.png" alt="Home page" />
              Home
            </a>
          </Link> */}
        {!loggedInPassed ? null : props.loggedIn ? (
          <Link href="/logout">
            <a className="headerPics">
              {/* <img src="/logout.png" alt="Log out" /> */}
              Log out
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="headerPics">
              {/* <img src="/login.png" alt="Log in" /> */}
              Log in
            </a>
          </Link>
        )}
        {/* </div> */}
      </div>
      <div className="container">
        {(() => {
          if (props.step === 1)
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li>Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
          if (props.step === 2)
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li class="active">Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
          if (props.step === 3)
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li class="active">Maximum distance</li>
                <li class="active">Weather forecast</li>
              </ul>
            );
        })()}
      </div>
    </header>
  );
}
