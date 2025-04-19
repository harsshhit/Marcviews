// src/components/Partners.tsx
import { useState } from "react";
import { Handshake, ShieldCheck, ExternalLink } from "lucide-react";
import formService from "../../services/formService";
import type { PartnerFormData } from "../../services/formService";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export function Partners() {
  const { showNotification } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PartnerFormData>({
    name: user?.name || "",
    email: user?.email || "",
    company: "",
    servicesInterested: "",
    userId: user?.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await formService.submitPartnerApplication(formData);
      setSuccessMessage(
        "Your partner application has been submitted successfully!"
      );
      showNotification({
        type: "success",
        message: "Your partner application has been submitted successfully!",
      });
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        company: "",
        servicesInterested: "",
        userId: user?.id,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);
      showNotification({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent mb-4">
              Partner With Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join our network of trusted partners and help us deliver
              exceptional services to our clients. We're looking for companies
              that share our values and commitment to excellence.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Why Partner Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent-teal">
              Why Partner With Us?
            </h2>
            <div className="space-y-6">
              <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-teal/20 rounded-full flex items-center justify-center">
                    <Handshake className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      Mutual Growth
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Partner with us to expand your business reach and tap into
                      new markets while we leverage your expertise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-teal/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      Trusted Partnership
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      Build long-term relationships with a company that values
                      integrity, transparency, and mutual success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partner Form Section */}
          <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-accent-teal mb-6">
              Become a Partner
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                {
                  label: "Name",
                  type: "text",
                  value: formData.name,
                  onChange: (e) =>
                    setFormData({ ...formData, name: e.target.value }),
                },
                {
                  label: "Business Email",
                  type: "email",
                  value: formData.email,
                  onChange: (e) =>
                    setFormData({ ...formData, email: e.target.value }),
                },
                {
                  label: "Company",
                  type: "text",
                  value: formData.company,
                  onChange: (e) =>
                    setFormData({ ...formData, company: e.target.value }),
                },
                {
                  label: "Which services you're interested in?",
                  type: "text",
                  value: formData.servicesInterested,
                  onChange: (e) =>
                    setFormData({
                      ...formData,
                      servicesInterested: e.target.value,
                    }),
                },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-white/90 mb-2 font-medium">
                    {field.label}
                    {index < 2 ? "*" : ""}
                  </label>
                  <input
                    type={field.type}
                    required={index < 2}
                    className="w-full p-3 rounded-lg bg-primary/50 text-white border border-primary-accent/20 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-teal text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-teal/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            <p className="text-sm mt-4 text-white/60 text-center">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>

        {/* Partners Grid Section */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-accent-teal">
            Our Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Microsoft",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.microsoft.com",
              },
              {
                name: "Cisco",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.cisco.com",
              },
              {
                name: "Palo Alto Networks",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.paloaltonetworks.com",
              },
              {
                name: "Fortinet",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.fortinet.com",
              },
              {
                name: "Check Point",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.checkpoint.com",
              },
              {
                name: "CrowdStrike",
                logo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
                url: "https://www.crowdstrike.com",
              },
            ].map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-all duration-300 flex flex-col items-center justify-center"
              >
                <div className="w-32 h-32 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-white/90 group-hover:text-accent-teal transition-colors duration-300 text-center">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
