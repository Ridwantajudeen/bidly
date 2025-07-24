import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Bidly</h2>
          <p className="text-gray-400 text-sm">
            Empowering freelancers and clients to collaborate with ease and trust.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#footer" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md bg-gray-800 text-white w-full sm:w-auto sm:flex-1"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/14JPSW1La5H/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com/Ritajtimi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ridwan-tajudeen/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/ritajtimi?igsh=MTl0NjU4OHNyMGJubA%3D%3D&utm_source=qr " target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bidly. All rights reserved.
      </div>
    </footer>
  );
}
