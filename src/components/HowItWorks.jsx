import { UserPlus, Briefcase, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-indigo-500" />,
      title: "Sign Up & Choose Role",
      description:
        "Create an account and decide whether you’re a client looking for talent or a freelancer ready to work.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      title: "Post or Discover Jobs",
      description:
        "Clients post opportunities. Freelancers browse the latest gigs based on skills and interest.",
    },
    {
      icon: <Send className="w-8 h-8 text-green-500" />,
      title: "Submit Proposals",
      description:
        "Freelancers submit proposals with their rates and timelines. Clients review and compare.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
      title: "Hire & Collaborate",
      description:
        "Clients accept proposals and kick off the work. Built for smooth communication and trust.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white text-gray-800 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg mb-12 text-gray-600">
          Whether you're a freelancer or a client, getting started is easy.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
