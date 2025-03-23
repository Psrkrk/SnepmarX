import { motion } from "framer-motion";
import { FaCode, FaCloud, FaTools, FaBrain } from "react-icons/fa";

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-6 md:px-12 py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
    >
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center text-pink-500 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
      >
        About Me
      </motion.h1>

      {/* Content Section */}
      <motion.div
        className="max-w-4xl text-center leading-relaxed text-gray-300"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
      >
        <p className="text-lg">
          I am <span className="text-pink-400 font-semibold">Pankaj Suman</span>, a passionate{" "}
          <span className="text-pink-400 font-semibold">Frontend Engineer</span> specializing in the{" "}
          <span className="text-pink-400 font-semibold">MERN stack</span>. Currently in the final year of my{" "}
          <span className="text-pink-400 font-semibold">BSc in Computer Science</span> with an Integrated IT Diploma, I thrive on
          building scalable, user-friendly web applications.
        </p>
        <p className="mt-4 text-lg">
          With strong problem-solving skills and expertise in{" "}
          <span className="text-pink-400 font-semibold">React, Node.js, Express, and MongoDB</span>, I focus on delivering
          high-performance digital experiences. My interests also extend to{" "}
          <span className="text-pink-400 font-semibold">DevOps, cloud services, and AI-driven solutions</span>.
        </p>
        <p className="mt-4 text-lg">
          Constantly exploring new technologies, I am eager to collaborate, innovate, and contribute to impactful projects in the
          tech space.
        </p>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }}
      >
        {[
          { icon: <FaCode />, title: "Frontend & MERN Stack", desc: "Building dynamic and scalable web applications." },
          { icon: <FaCloud />, title: "Cloud & DevOps", desc: "Optimizing deployments with AWS, Docker, and CI/CD." },
          { icon: <FaTools />, title: "Performance Optimization", desc: "Creating high-performance digital experiences." },
          { icon: <FaBrain />, title: "AI & Machine Learning", desc: "Exploring AI-driven solutions for smarter apps." },
        ].map((skill, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-lg text-center"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="text-pink-400 text-4xl mb-3">{skill.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
            <p className="text-gray-400 text-sm">{skill.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Button */}
      <motion.a
        href="mailto:pankajsuman8086041@gmail.com"
        className="mt-10 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-md text-lg"
        whileHover={{ scale: 1.05 }}
      >
        Contact Me
      </motion.a>
    </motion.div>
  );
};

export default About;
