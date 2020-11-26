import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

export default function PlanTrip(props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Plan Trip</title>
      </Head>
      <main>
        <div className="planTripLocation">
          <div className="planTrip">
            <div className="planTripTextSmall">How does it work ?</div>
            <div className="planTripText">
              Plan your trip with 3 short steps. <br />
              Meet the steps in the gallery <br />
              on the right.
            </div>
            <Link href="/startingPoint">
              <a>
                <button className="planTripButton">I want to start</button>
              </a>
            </Link>
          </div>
          <div className="planTripImg">
            <div class="wrapImgPlanTrip">
              <img
                className="imagePlanTrip"
                src="step1.jpg"
                alt="Step 1"
                // width="500vw"
                // height="300vh"
              />
              <div class="overlayImgPlanTrip">
                <div class="textOverlayPlanTrip">
                  Step 1<br /> <br />
                  <br />
                  Find your current location <br />
                  📍
                </div>
              </div>
            </div>
            <div class="wrapImgPlanTrip">
              <img
                className="imagePlanTrip"
                src="step2.jpg"
                alt="Step 2"
                // width="500"
                // height="300"
              />
              <div class="overlayImgPlanTrip">
                <div class="textOverlayPlanTrip">
                  Step 2<br /> <br />
                  <br />
                  Find nearby cities by distance and population 🚩
                </div>
              </div>
            </div>
            <div class="wrapImgPlanTrip">
              <img
                className="imagePlanTrip"
                src="step3.jpg"
                alt="Step 3"
                // width="500"
                // height="300"
              />
              <div class="overlayImgPlanTrip">
                <div class="textOverlayPlanTrip">
                  Step 3<br /> <br />
                  <br />
                  Get a forecast in the selected city <br /> ☀️
                </div>
              </div>
            </div>
            {/* <img src="step2.jpg" alt="Linkedin logo" width="300" height="500" />
            <img src="step3.jpg" alt="Linkedin logo" width="300" height="500" /> */}
            {/* <button className="planTripItem1" data-cy="plan-trip-step-1">
              Step 1:<br></br>
              <br></br> Starting point
            </button>
            <button className="planTripItem4" data-cy="plan-trip-step-2">
              Step 2:<br></br>
              <br></br> Maximum distance
            </button>
            <button className="planTripItem3" data-cy="plan-trip-step-3">
              Step 3:<br></br>
              <br></br> Weather forecast
            </button> */}
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
