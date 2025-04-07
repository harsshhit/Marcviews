// src/components/Leadership.tsx
import { Linkedin } from "lucide-react";

export function Leadership() {
  return (
    <div className="min-h-screen bg-primary text-white pt-24 px-4 pb-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Leadership</h1>

      {/* Leader Profile */}
      <div className="bg-white/5 p-6 rounded-2xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold">Kumar Shanu, CISO</h2>
        <p className="text-white/80 mt-4 text-lg italic">
          "Guarding the digital frontiers, we defend against cyber threats with
          unwavering expertise, innovative solutions, and a relentless
          commitment to safeguarding your digital world."
        </p>
        <a
          href="https://www.linkedin.com/in/kumarshanu" // Replace with actual profile link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-accent-teal hover:text-accent-purple"
        >
          <Linkedin className="mr-2" /> LinkedIn
        </a>
      </div>

      {/* Why Choose Us Section */}
      <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
      <div className="grid gap-6 md:grid-cols-2">
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
            className="bg-white/5 p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-white/80">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
