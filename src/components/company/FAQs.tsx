import { Link } from "react-router-dom";

export function FAQs() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent mb-4">
            Managed IT Services FAQs
          </h1>
          <p className="text-xl text-white/90">
            Please reach us at{" "}
            <a
              href="mailto:contact@marcviews.com"
              className="text-accent-teal hover:text-accent-teal/80 transition-colors duration-300"
            >
              contact@marcviews.com
            </a>{" "}
            if you cannot find an answer to your question.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="space-y-6">
          {[
            {
              question: "What is Managed IT Services?",
              answer:
                "Managed IT Services is a comprehensive approach where an external IT service provider takes responsibility for managing an organization's IT infrastructure and operations. This includes tasks like network management, cybersecurity, cloud services, and help desk support.",
            },
            {
              question: "Why Should I Consider Managed IT Services?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Cost-Effective: Reduces IT expenses by outsourcing to experts.",
                    "Increased Productivity: Focus on core business operations, not IT issues.",
                    "Enhanced Security: Proactive security measures to protect your data.",
                    "Scalability: Easily adapt to changing business needs.",
                    "Expert Support: 24/7 access to skilled IT professionals.",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              question: "What is Included in Your Managed IT Services Package?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Network monitoring and management",
                    "Cybersecurity and threat protection",
                    "Cloud services management",
                    "Help desk and technical support",
                    "Data backup and disaster recovery",
                    "IT consulting and strategic planning",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              question:
                "How Will Managed IT Services Impact My Business Operations?",
              answer:
                "You'll experience smoother IT operations, reduced downtime, and improved security. Your IT team can focus on strategic initiatives, while the managed service provider handles the day-to-day tasks.",
            },
            {
              question: "How Do I Transition to Managed IT Services?",
              answer:
                "The transition process is typically seamless. Our onboarding team will work closely with your team to assess your current IT infrastructure, develop a transition plan, and minimize disruptions.",
            },
            {
              question: "How Can Managed IT Services Enhance My Cybersecurity?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Regular security audits and vulnerability assessments",
                    "Intrusion detection and prevention systems",
                    "Endpoint protection solutions",
                    "Firewall configuration and management",
                    "Regular security awareness training for employees",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              question: "How Do You Protect My Sensitive Data?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Data encryption",
                    "Access controls and user authentication",
                    "Regular backups and disaster recovery plans",
                    "Compliance with industry standards (e.g., GDPR, PCI-DSS, HIPAA, PIPEDA)",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              question: "Can You Help Me Migrate to the Cloud?",
              answer:
                "Yes, we offer cloud migration services to help you transition to cloud-based solutions. We can assess your needs, choose the right cloud platform, and manage the migration process.",
            },
            {
              question: "How Do You Ensure Cloud Security?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Regular security assessments",
                    "Access controls and identity management",
                    "Data encryption",
                    "Network security measures",
                    "Compliance with cloud security standards",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              question: "How Can I Measure the ROI of Managed IT Services?",
              answer: (
                <ul className="space-y-3">
                  {[
                    "Reduced IT costs",
                    "Increased productivity",
                    "Improved security posture",
                    "Minimized downtime",
                    "Enhanced employee satisfaction",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300"
            >
              <h2 className="text-2xl font-semibold text-accent-teal mb-4">
                {faq.question}
              </h2>
              <div className="text-white/90 leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-accent-teal mb-6">
            Considering a migration to public cloud?
          </h2>
          <p className="text-xl text-white/90 mb-6">Ask yourself:</p>
          <ul className="space-y-3 mb-8">
            {[
              "DOES MY DATA WAREHOUSE HAVE FAST ANALYTICAL PERFORMANCE?",
              "AM I EXPERIENCING PROBLEMS WITH WORKLOAD MANAGEMENT?",
              "IS MY PLATFORM TRULY SCALABLE?",
              "CAN I QUICKLY ENABLE DATA SHARING?",
              "AM I CHARGED FOR MORE THAN I ACTUALLY NEED?",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact/appointment"
              className="bg-accent-teal text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-teal/90 transition-colors duration-300"
            >
              Book an Appointment
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
