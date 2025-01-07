/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Pankaj Suman",
      role: "Senior Product Designer",
      image: "https://ecommerce-sk.vercel.app/img/kamal.png",
      text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
    },
    {
      id: 2,
      name: "ankita sarma",
      role: "UI Developer",
      image: "https://www.devknus.com/img/gawri.png",
      text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
    },
    {
      id: 3,
      name: "Deepak rathor",
      role: "CTO",
      image:
        "https://firebasestorage.googleapis.com/v0/b/devknus-official-database.appspot.com/o/images%2FScreenshot%202023-07-07%20at%202.20.32%20PM-modified.png?alt=media&token=324ddd80-2b40-422c-9f1c-1c1fa34943fa",
      text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
    },
  ];

  return (
    <section className="text-gray-600 body-font mb-10">
      <div className="container px-5 py-10 mx-auto">
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-black">
          Testimonial
        </h1>
        <h2 className="text-center text-2xl font-semibold mb-10">
          What our <span className="text-pink-500">customers</span> are saying
        </h2>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap -m-4">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="lg:w-1/3 lg:mb-0 mb-6 p-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.2 }}
            >
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={testimonial.image}
                />
                <p className="leading-relaxed">{testimonial.text}</p>
                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  {testimonial.name}
                </h2>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
