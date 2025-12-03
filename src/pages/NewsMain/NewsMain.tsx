import React from "react";
import "./NewsMain.css";
import WelcomeNews from "../../components/WelcomeNews/WelcomeNews";
import CardConceptCompo2 from "../../components/CardConceptCompo2/CardConceptCompo2";
import NewsBar from "../../components/NewsBar/NewsBar";

export default function NewsMain() {
  return (
    <div>
      <WelcomeNews
        title="News"
        text="Welcome To Casa Verde News"
        wallpaperUrl="/images/backgrounds/5.png"
      />
      <div className="NewsMain__main">
        <div className="main__body">
          <div className="main__body__row">
            <div className="main__body__col">
              <img
                className="main__body__col__image"
                alt="img"
                src="/images/blogCart/blog3.jpg"
              />
            </div>
            <div className="main__body__col">
              <div className="main__body__col__title">
                As housing inventory improves, so does affordability
              </div>
              <div className="main__body__col__text">
                Despite continued regional differences, housing affordability
                was sunnier in 43 of the top 50 markets in April, according to
                First American’s June report.
              </div>
            </div>
          </div>
          <div className="main__body__row row__revers">
            <div className="main__body__col">
              <div className="main__body__col__title">
                Brokerage Beat: Expansions at RE/MAX, Christie’s; New England
                indies merge
              </div>
              <div className="main__body__col__text">
                Plus, two Texas-based Corcoran affiliates join forces; BHGRE
                opens new California office; two teams rejoin Compass;
                Christie’s adds Caribbean office; more.
              </div>
            </div>
            <div className="main__body__col">
              <img
                className="main__body__col__image"
                alt="img"
                src="/images/blogCart/blog1.jpg"
              />
            </div>
          </div>
          <div className="main__body__row ">
            <div className="main__body__col">
              <img
                className="main__body__col__image"
                alt="img"
                src="/images/blogCart/blog2.jpg"
              />
            </div>
            <div className="main__body__col">
              <div className="main__body__col__title">
                July trade deal deadline ‘not critical,’ White House says
              </div>
              <div className="main__body__col__text">
                Negotiations aren’t expected to wrap up until September. Plus,
                the president dismisses inflation data as he looks for a new Fed
                chair; GSEs consider crypto.
              </div>
            </div>
          </div>
        </div>
        <div className="main__leftSider">
          <div className="main__leftSider__row">
            <img
              className="leftSider__rowImg"
              src="/images/users/icons/artist.png"
              alt="rowImg"
            />
            <div className="leftSider__dataWrapper">
              <div className="leftSider__title">
                Compass CEO asks judge to stop Zillow’s listing ban
              </div>
              <div className="leftSider__text">
                Robert Reffkin claims the new standards will “cause irreparable
                damage” and suggested that Zillow and Redfin execs were working
                together to force Compass’ hand.
              </div>
            </div>
          </div>
          <div className="main__leftSider__row">
            <img
              className="leftSider__rowImg"
              src="/images/users/icons/avatar.png"
              alt="rowImg"
            />
            <div className="leftSider__dataWrapper">
              <div className="leftSider__title">
                MLS extending push for transparency to referral fees
              </div>
              <div className="leftSider__text">
                New disclosure forms will help buyers and sellers understand who
                is getting paid — and how much — during home transactions,
                Northwest MLS says.
              </div>
            </div>
          </div>
          <div className="main__leftSider__row">
            <img
              className="leftSider__rowImg"
              src="/images/users/icons/boy.png"
              alt="rowImg"
            />
            <div className="leftSider__dataWrapper">
              <div className="leftSider__title">
                Chicago indie brokerages merge as national brands close in
              </div>
              <div className="leftSider__text">
                The union of venerable Baird & Warner and “friendly competitor”
                Dream Town will create the 2nd-largest brokerage in the region,
                with about 3,000 agents.
              </div>
            </div>
          </div>
          <div className="main__leftSider__row">
            <img
              className="leftSider__rowImg"
              src="/images/users/icons/man.png"
              alt="rowImg"
            />
            <div className="leftSider__dataWrapper">
              <div className="leftSider__title">
                The next greatest opportunity
              </div>
              <div className="leftSider__text">
                Real estate is poised for a boom as rates drop. Agents can win
                big by offering tailored, tech-savvy services like Move
                Concierge to meet evolving buyer needs.
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardConceptCompo2 />

      <div className="newsBar__container">
        <NewsBar />
      </div>
    </div>
  );
}
