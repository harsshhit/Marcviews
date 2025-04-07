// src/components/Partners.tsx
import { Handshake, ShieldCheck, ExternalLink } from "lucide-react";

export function Partners() {
  return (
    <div className="min-h-screen bg-primary text-white pt-24 px-4 pb-20 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Partner With Us</h1>
        <p className="text-lg text-white/90">
          Become a MarcViews partner & join our growing cybersecurity ecosystem!
          By collaborating with us, you gain access to industry-leading security
          solutions and technologies that help you address critical threats and
          build a resilient future.
        </p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl shadow-md mb-10">
        <div className="flex items-center gap-4 mb-4">
          <Handshake className="text-accent-yellow" />
          <h2 className="text-2xl font-semibold">
            Why Partner With MarcViews?
          </h2>
        </div>
        <p className="mb-2 text-white/80">
          Our Managed Security Services empower partners to deliver unparalleled
          protection to their customers with:
        </p>
        <ul className="list-disc ml-6 text-white/80 space-y-1">
          <li>Cutting-edge cybersecurity technology</li>
          <li>24/7 monitoring and incident response</li>
          <li>Flexible partnership models</li>
          <li>Ongoing support and enablement</li>
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
        <form className="grid gap-4 bg-white/5 p-6 rounded-2xl">
          <input
            type="text"
            placeholder="Name*"
            className="bg-white/10 px-4 py-2 rounded-lg placeholder-white/70 text-white"
          />
          <input
            type="email"
            placeholder="Business Email*"
            className="bg-white/10 px-4 py-2 rounded-lg placeholder-white/70 text-white"
          />
          <input
            type="text"
            placeholder="Company"
            className="bg-white/10 px-4 py-2 rounded-lg placeholder-white/70 text-white"
          />
          <input
            type="text"
            placeholder="Which services you're interested in?*"
            className="bg-white/10 px-4 py-2 rounded-lg placeholder-white/70 text-white"
          />
          <button className="bg-accent-teal px-6 py-2 rounded-xl font-semibold hover:bg-accent-purple transition">
            Submit
          </button>
        </form>
        <p className="text-xs mt-2 text-white/60">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-4">
          MarcViews Networks as Authorized Seller and Business Partner
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white/10 p-4 rounded-lg hover:bg-white/20 transition"
            >
              <span className="text-white/90">Visit Partner Website</span>
              <ExternalLink className="w-4 h-4 text-white/70" />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <ShieldCheck className="mx-auto mb-2 text-accent-teal" />
        <h4 className="text-xl font-semibold mb-1">
          Speak to a Cybersecurity Expert
        </h4>
        <a
          href="/contact"
          className="inline-block mt-2 bg-accent-yellow text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent-purple hover:text-white transition"
        >
          Contact Now
        </a>
      </div>
    </div>
  );
}
