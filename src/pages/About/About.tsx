import React from "react";
import "./About.css";
import WelcomeNews from "../../component-backup/WelcomeNews/WelcomeNews";
import CarouselTop from "../../component-backup/CarouselTop/CarouselTop";
import ContactForm from "../../component-backup/ContactForm/ContactForm";

export default function About() {
  return (
    <div className="about">
      <WelcomeNews
        title="About us"
        text="All about our work and experience"
        wallpaperUrl="/images/backgrounds/1.png"
      />
      <div className="about__missions">
        <div className="about__missions__container glass-background">
          <div className="about__missions__leftContainer">
            <h2 className="about__missions__header ">Our Missions:</h2>
            <p className="about__missions__text">
              At Casa Verde, our mission is to empower individuals and families
              to achieve their real estate dreams. We are dedicated to providing
              exceptional service, expert guidance, and personalized support
              throughout every step of the buying, selling, or investment
              process.
            </p>
            <h2 className="about__missions__header ">Our Commitment:</h2>
            <div className="commitment__Wrapper">
              <h4 className="about__missions__subheader ">Client-Focused:</h4>
              <p className="about__missions__text">
                We prioritize understanding your unique needs and goals,
                ensuring a seamless and rewarding experience.
              </p>
              <h4 className="about__missions__subheader ">Expertise:</h4>
              <p className="about__missions__text">
                Our team possesses in-depth local market knowledge and a proven
                track record of success.
              </p>
              <h4 className="about__missions__subheader ">Integrity:</h4>
              <p className="about__missions__text">
                We operate with honesty, transparency, and a commitment to
                ethical practices.
              </p>
              <h4 className="about__missions__subheader ">Results-Oriented:</h4>
              <p className="about__missions__text">
                We are dedicated to achieving your real estate objectives,
                whether it's finding your dream home, maximizing your sale
                price, or securing a profitable investment.
              </p>
            </div>
          </div>
          <div className="about__missions__rightContainer">
            <CarouselTop />
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
