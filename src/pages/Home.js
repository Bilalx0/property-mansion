import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedListings from "../components/FeaturedListings";
import LifestyleChoices from "../components/LifestyleChoices";
import MagazineCollection from "../components/MagazineCollection";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedListings />
      <LifestyleChoices />
      <MagazineCollection />
      <Footer />
    </div>
  );
};

export default Home;
