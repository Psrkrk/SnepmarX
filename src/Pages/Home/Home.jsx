import Layout from "../../Components/Layout/Layout";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Category from "../../Components/Category/Category";
import HomePageProductCard from "../../Components/HomePageProductCard/HomePageProductCard";
import Track from "../../Components/Track/Track";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home = () => {
  return (
    <Layout>



      {/* Navbar is automatically included in the Layout component */}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <section id="categories" className="py-12">
          <Category />
        </section>

        {/* Product Card Section */}
        <section id="products" className="py-12 bg-gray-50">
          <HomePageProductCard />
        </section>

        {/* Track Your Order Section */}
        <section id="track-order" className="py-12">
          <Track />
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-12 bg-gray-50">
          <Testimonial />
        </section>
      </main>

      {/* Footer is automatically included in the Layout component */}
    </Layout>
  );
};

export default Home;