export function AboutUs() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-primary text-white max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">About MarcViews Networks</h1>

      <p className="text-white/80">
        MarcViews Networks is a premier Managed Security Service Provider (MSSP)
        based in Toronto with service delivery centers in Mississauga, ON,
        Canada and Noida, UP, India.
      </p>

      <p className="text-white/80">
        Our services are tailored to protect businesses from cyber threats by
        providing software, hardware, experienced engineers, analysts, and
        researchers who will keep your company's data, network, applications,
        workstations, infrastructure, and users safe and can respond to attacks
        as they happen.
      </p>

      <p className="text-white/80">
        Our services protect data, device, network, cloud, application,
        identity, and operate network operations center (NOC) and security
        operations center (SOC).
      </p>

      <h2 className="text-2xl font-semibold pt-4">Benefits you get:</h2>
      <ul className="list-disc list-inside text-white/80 space-y-1">
        <li>Improved Security & Compliance</li>
        <li>Increased Productivity & Efficiency</li>
        <li>Standardized & Unified IT Infrastructure</li>
        <li>Improved Agility & Responsiveness</li>
      </ul>

      <h2 className="text-2xl font-semibold pt-4">Why us?</h2>
      <p className="text-white/80">
        MarcViews Networks is a cloud-native company that identifies strengths,
        redundancies, and gaps in your security posture. Through our
        complementary and comprehensive assessments (cyber threat assessment and
        cyber resilience assessment), we identify unsecure endpoints, patch
        exposed devices, standardize threat management, and assess your exposure
        to major security threats — leaving you with peace of mind and a plan
        for success.
      </p>

      <div className="text-white text-xl font-semibold pt-6">
        Safeguard the digital realm and ensure a cyber-resilient future.
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-white/80">
          Fortify the digital landscape, foster trust, and enable innovation in
          the interconnected world by becoming one of the top MSSPs in Canada.
        </p>

        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p className="text-white/80">Solution Briefs:</p>
        <ul className="list-disc list-inside text-white/80 space-y-1">
          <li>Co-Managed SIEM (pdf)</li>
          <li>Data Security (pdf)</li>
          <li>Endpoint Protection (pdf)</li>
          <li>Firewall-as-a-Service (pdf)</li>
          <li>Infrastructure-as-a-Service (pdf)</li>
          <li>Managed Defense for AWS (pdf)</li>
          <li>Remote Monitoring & Management (pdf)</li>
          <li>Managed IT Services (pdf)</li>
        </ul>
      </div>

      <div className="pt-6">
        <p className="text-white/80">
          Need more info? <strong>Get a quote</strong> |{" "}
          <strong>Call us</strong> | <strong>Email</strong>
        </p>
      </div>

      <footer className="pt-10 border-t border-white/10 text-sm text-white/60">
        MarcViews Networks : MSSP
        <br />
        111 Queen St. E, S. Building, Suite 450, Toronto, ON, M5C 1S2
        <br />© 2025 MarcViews Networks, Inc. | Cookies Notice | Legal Notice |
        Terms of Use
      </footer>
    </div>
  );
}
