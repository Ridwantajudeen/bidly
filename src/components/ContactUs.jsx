import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <section id="contact" className="bg-gray-50 py-20 px-6 text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Talk</h2>
          <p className="text-gray-600 mb-6">
            Got a question, suggestion, or need support? Reach out — we're always happy to hear from you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <a href="mailto:ridwantajudeen8@gmail.com" className="text-sm hover:underline">support@bidly.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-600" />
              <a href="tel:+2347047203471" className="text-sm hover:underline">+234 704 720 3471</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Lagos, Nigeria</span>
            </div>
          </div>
        </motion.div>

        
        <motion.form
          className="bg-white rounded-xl shadow p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" placeholder="Your Name" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="you@example.com" className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea rows="4" placeholder="Your message..." className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"></textarea>
          </div>
          <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
