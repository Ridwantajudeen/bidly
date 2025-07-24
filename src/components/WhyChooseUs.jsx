import { BadgeCheck, Rocket, Users, Workflow } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseBidly() {
  const features = [
    {
      icon: <BadgeCheck className="w-8 h-8 text-indigo-600" />,
      title: "Verified Freelancers",
      description:
        "We vet every freelancer so you hire with confidence — quality work only.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      title: "Smart Bidding",
      description:
        "Post a project, get tailored bids. Choose the right fit based on price, speed, and reviews.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Built for Teams",
      description:
        "Manage conversations, deadlines, and files — all in one place, whether solo or in a team.",
    },
    {
      icon: <Workflow className="w-8 h-8 text-blue-500" />,
      title: "Smooth Workflow",
      description:
        "From proposal to payment, Bidly handles it all. No confusion, no mess, just results.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Choose Bidly</h2>
        <p className="mb-12 text-gray-600 text-lg">
          The smarter way to find top freelancers and get your projects done efficiently.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
