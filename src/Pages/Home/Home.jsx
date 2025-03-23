import Layout from "../../Components/Layout/Layout";
import HeroSection from "../../Components/heroSection/HeroSection";
import Category from "../../Components/Category/Category";
import HomePageProductCard from "../../Components/HomePageProductCard/HomePageProductCard";
import Track from "../../Components/Track/Track";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <Category />

      {/* Product Card Section */}
      <HomePageProductCard />

      {/* Track Your Order Section */}
      <Track />

      {/* Testimonials */}
      <Testimonial />
    </Layout>
  );
};

export default Home;
