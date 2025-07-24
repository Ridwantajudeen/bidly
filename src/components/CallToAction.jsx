import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

export default function CallToAction() {
  return (
    <section className="bg-indigo-600 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to get work done the smarter way?
        </motion.h2>

        <motion.p
          className="text-lg text-indigo-100 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you're hiring talent or offering your skills — Bidly makes freelancing fast, fair, and focused.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/signup?role=client"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-100 transition"
          >
            I'm Hiring
          </Link>
          <Link
            to="/signup?role=freelancer"
            className="bg-indigo-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            I'm a Freelancer
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
