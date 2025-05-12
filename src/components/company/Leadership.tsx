// src/components/Leadership.tsx
import { Linkedin } from "lucide-react";

export function Leadership() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent mb-4">
            Leadership
          </h1>
          <p className="text-xl text-white/90">
            Meet our visionary leaders who drive innovation and excellence in
            cybersecurity.
          </p>
        </div>

        {/* Leader Profile */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop"
                  alt="Kumar Shanu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-red-500 mb-4">
                Kumar Shanu, CISO
              </h2>
              <p className="text-white/90 text-lg leading-relaxed italic mb-6">
                "Guarding the digital frontiers, we defend against cyber threats
                with unwavering expertise, innovative solutions, and a
                relentless commitment to safeguarding your digital world."
              </p>
              <a
                href="https://www.linkedin.com/in/kumarshanu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent-teal/10 text-red-500 rounded-lg hover:bg-accent-teal/20 transition-colors duration-300"
              >
                <Linkedin className="mr-2" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-red-500">Why Choose Us?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Expertise",
                description:
                  "Our team of cybersecurity experts has years of experience helping businesses like yours stay protected against evolving threats.",
              },
              {
                title: "Customized Solutions",
                description:
                  "We understand that every business is unique, which is why we tailor our solutions to meet your specific needs and budget.",
              },
              {
                title: "Proactive Approach",
                description:
                  "We take a proactive approach to cybersecurity, identifying and mitigating potential risks before they can impact your business.",
              },
              {
                title: "24/7 Monitoring",
                description:
                  "We provide round-the-clock monitoring of your network and devices, so you can rest easy knowing that we've got your back.",
              },
              {
                title: "24/7 Support",
                description:
                  "Our dedicated support team is available around the clock to assist you with any security-related issues or concerns.",
              },
              {
                title: "Incident Response",
                description:
                  "In the event of a security breach or cyber attack, our incident response team will be there to help you contain the damage and get back on track.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-red-500 mb-3">
                  {item.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
