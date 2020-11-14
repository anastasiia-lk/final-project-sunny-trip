import Link from 'next/link';

export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  return (
    <header className="headerWrap">
      <div className="headerStyle">
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
      </div>
      <div className="container">
        {/* {props.page === 'step1' ? (
          <ul className="progressbar">
            <li class="active">Starting point</li>
            <li>Trip date</li>
            <li>Maximum distance</li>
            <li>Weather forecast</li>
          </ul>
        ) : (
          ''
        )}
      </div>
      <div className="container">
        {props.page === 'step2' ? (
          <ul className="progressbar">
            <li class="active">Starting point</li>
            <li class="active">Trip date</li>
            <li>Maximum distance</li>
            <li>Weather forecast</li>
          </ul>
        ) : (
          <ul className="progressbar">
            <li>Starting point</li>
            <li>Trip date</li>
            <li>Maximum distance</li>
            <li>Weather forecast</li>
          </ul>
        )} */}
        {(() => {
          if (props.page === 'step0')
            return (
              <ul className="progressbar">
                <li>Starting point</li>
                <li>Trip date</li>
                <li>Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
          if (props.page === 'step1')
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li>Trip date</li>
                <li>Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
          if (props.page === 'step2')
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li class="active">Trip date</li>
                <li>Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
          if (props.page === 'step3')
            return (
              <ul className="progressbar">
                <li class="active">Starting point</li>
                <li class="active">Trip date</li>
                <li class="active">Maximum distance</li>
                <li>Weather forecast</li>
              </ul>
            );
        })()}
      </div>
    </header>
  );
}
