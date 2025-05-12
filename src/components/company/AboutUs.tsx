export function AboutUs() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
            About MarcViews Networks
          </h1>
        </div>

        {/* Introduction Section */}
        <div className="space-y-6">
          <p className="text-xl text-white/90 leading-relaxed">
            MarcViews Networks is a premier Managed Security Service Provider
            (MSSP) based in Toronto with service delivery centers in
            Mississauga, ON, Canada and Noida, UP, India.
          </p>

          <p className="text-xl text-white/90 leading-relaxed">
            Our services are tailored to protect businesses from cyber threats
            by providing software, hardware, experienced engineers, analysts,
            and researchers who will keep your company's data, network,
            applications, workstations, infrastructure, and users safe and can
            respond to attacks as they happen.
          </p>

          <p className="text-xl text-white/90 leading-relaxed">
            Our services protect data, device, network, cloud, application,
            identity, and operate network operations center (NOC) and security
            operations center (SOC).
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Benefits you get:
            </h2>
            <ul className="space-y-3">
              {[
                "Improved Security & Compliance",
                "Increased Productivity & Efficiency",
                "Standardized & Unified IT Infrastructure",
                "Improved Agility & Responsiveness",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Why us?
            </h2>
            <p className="text-white/90 leading-relaxed">
              MarcViews Networks is a cloud-native company that identifies
              strengths, redundancies, and gaps in your security posture.
              Through our complementary and comprehensive assessments (cyber
              threat assessment and cyber resilience assessment), we identify
              unsecure endpoints, patch exposed devices, standardize threat
              management, and assess your exposure to major security threats —
              leaving you with peace of mind and a plan for success.
            </p>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Our Mission
            </h2>
            <p className="text-white/90 leading-relaxed">
              Fortify the digital landscape, foster trust, and enable innovation
              in the interconnected world by becoming one of the top MSSPs in
              Canada.
            </p>
          </div>

          <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              Our Vision
            </h2>
            <p className="text-white/90 leading-relaxed">
              To be the leading provider of comprehensive cybersecurity
              solutions, empowering businesses to thrive in a secure digital
              environment.
            </p>
          </div>
        </div>

        {/* Solution Briefs */}
        <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-red-500">
            Solution Briefs
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Co-Managed SIEM",
              "Data Security",
              "Endpoint Protection",
              "Firewall-as-a-Service",
              "Infrastructure-as-a-Service",
              "Managed Defense for AWS",
              "Remote Monitoring & Management",
              "Managed IT Services",
            ].map((solution, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center text-white/90 hover:text-red-500 transition-colors duration-300"
              >
                <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                {solution} (pdf)
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-white/10 text-sm text-white/60">
          <div className="flex flex-wrap gap-4 justify-between">
            <div>
              <p className="font-semibold text-white/80">
                MarcViews Networks : MSSP
              </p>
              <p>
                111 Queen St. E, S. Building, Suite 450, Toronto, ON, M5C 1S2
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Cookies Notice
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Legal Notice
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors duration-300"
              >
                Terms of Use
              </a>
            </div>
          </div>
          <p className="mt-4">© 2025 MarcViews Networks, Inc.</p>
        </footer>
      </div>
    </div>
  );
}
