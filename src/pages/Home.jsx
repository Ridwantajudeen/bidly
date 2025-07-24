import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import WhyChooseBidly from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";
import ContactUs from "../components/ContactUs";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center bg-gray-50">
      <section
        style={{
          backgroundImage: `url(/bidlyhero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center text-white max-w-3xl px-4 bg-black/40 py-8 rounded shadow-lg ">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Bid on opportunities. Land your next gig.
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Welcome to <span className="text-blue-400 font-semibold">Bidly.</span> The freelance platform for modern professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/jobs"
              className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
        
      </section>
      <WhyChooseBidly/>
      <HowItWorks/>
      <CallToAction/>
      <ContactUs/>
      
    </main>
    
  );
}
