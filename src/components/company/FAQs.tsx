export function FAQs() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-primary text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Managed IT Services FAQs</h1>
      <p className="text-white/80 mb-10">
        Please reach us at{" "}
        <a
          href="mailto:contact@marcviews.com"
          className="text-accent-teal underline"
        >
          contact@marcviews.com
        </a>{" "}
        if you cannot find an answer to your question.
      </p>

      {[
        {
          question: "What is Managed IT Services?",
          answer:
            "Managed IT Services is a comprehensive approach where an external IT service provider takes responsibility for managing an organization's IT infrastructure and operations. This includes tasks like network management, cybersecurity, cloud services, and help desk support.",
        },
        {
          question: "Why Should I Consider Managed IT Services?",
          answer: (
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Cost-Effective: Reduces IT expenses by outsourcing to experts.
                </li>
                <li>
                  Increased Productivity: Focus on core business operations, not
                  IT issues.
                </li>
                <li>
                  Enhanced Security: Proactive security measures to protect your
                  data.
                </li>
                <li>Scalability: Easily adapt to changing business needs.</li>
                <li>
                  Expert Support: 24/7 access to skilled IT professionals.
                </li>
              </ul>
            </>
          ),
        },
        {
          question: "What is Included in Your Managed IT Services Package?",
          answer: (
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>Network monitoring and management</li>
                <li>Cybersecurity and threat protection</li>
                <li>Cloud services management</li>
                <li>Help desk and technical support</li>
                <li>Data backup and disaster recovery</li>
                <li>IT consulting and strategic planning</li>
              </ul>
            </>
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
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>Regular security audits and vulnerability assessments</li>
                <li>Intrusion detection and prevention systems</li>
                <li>Endpoint protection solutions</li>
                <li>Firewall configuration and management</li>
                <li>Regular security awareness training for employees</li>
              </ul>
            </>
          ),
        },
        {
          question: "How Do You Protect My Sensitive Data?",
          answer: (
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>Data encryption</li>
                <li>Access controls and user authentication</li>
                <li>Regular backups and disaster recovery plans</li>
                <li>
                  Compliance with industry standards (e.g., GDPR, PCI-DSS,
                  HIPAA, PIPEDA)
                </li>
              </ul>
            </>
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
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>Regular security assessments</li>
                <li>Access controls and identity management</li>
                <li>Data encryption</li>
                <li>Network security measures</li>
                <li>Compliance with cloud security standards</li>
              </ul>
            </>
          ),
        },
        {
          question: "How Can I Measure the ROI of Managed IT Services?",
          answer: (
            <>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduced IT costs</li>
                <li>Increased productivity</li>
                <li>Improved security posture</li>
                <li>Minimized downtime</li>
                <li>Enhanced employee satisfaction</li>
              </ul>
            </>
          ),
        },
      ].map((faq, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{faq.question}</h2>
          <div className="text-white/80 text-base">{faq.answer}</div>
        </div>
      ))}

      <div className="mt-16 border-t border-white/10 pt-8">
        <h2 className="text-2xl font-bold mb-4">
          Considering a migration to public cloud?
        </h2>
        <p className="mb-4">Ask yourself:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/80">
          <li>DOES MY DATA WAREHOUSE HAVE FAST ANALYTICAL PERFORMANCE?</li>
          <li>AM I EXPERIENCING PROBLEMS WITH WORKLOAD MANAGEMENT?</li>
          <li>IS MY PLATFORM TRULY SCALABLE?</li>
          <li>CAN I QUICKLY ENABLE DATA SHARING?</li>
          <li>AM I CHARGED FOR MORE THAN I ACTUALLY NEED?</li>
        </ul>
        <div className="mt-6 space-y-3">
          <button className="bg-accent-teal px-6 py-3 rounded hover:bg-accent-purple transition">
            Book an Appointment
          </button>
          <button className="ml-4 border border-white/30 px-6 py-3 rounded hover:bg-white/10 transition">
            Request a Call
          </button>
        </div>
      </div>
    </div>
  );
}
