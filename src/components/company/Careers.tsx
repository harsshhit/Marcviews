// src/components/Careers.tsx

import { useState } from "react";
import formService from "../../services/formService";
import type { CareerFormData } from "../../services/formService";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export function Careers() {
  const { showNotification } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState<CareerFormData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    linkedinProfile: "",
    position: "",
    resumeUrl: "",
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
      await formService.submitCareerApplication(formData);
      setSuccessMessage("Your application has been submitted successfully!");
      showNotification({
        type: "success",
        message: "Your application has been submitted successfully!",
      });
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        linkedinProfile: "",
        position: "",
        resumeUrl: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a storage service
      // and get back a URL. For now, we'll just store the file name
      setFormData({ ...formData, resumeUrl: file.name });
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
              Join Our Team
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. If
              you're passionate about technology and innovation, we'd love to
              hear from you.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Current Openings Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent-teal">
              Current Openings
            </h2>
            <div className="space-y-6">
              <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Senior Software Engineer
                </h3>
                <p className="text-white/90 mb-4 leading-relaxed">
                  Join our engineering team to build cutting-edge solutions that
                  help protect businesses from cyber threats.
                </p>
                <ul className="text-white/90 space-y-2">
                  {[
                    "5+ years of experience in software development",
                    "Strong knowledge of security best practices",
                    "Experience with cloud platforms",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-accent/10 rounded-xl p-6 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Security Analyst
                </h3>
                <p className="text-white/90 mb-4 leading-relaxed">
                  Help us analyze and respond to security incidents, and develop
                  strategies to prevent future threats.
                </p>
                <ul className="text-white/90 space-y-2">
                  {[
                    "3+ years of experience in cybersecurity",
                    "Knowledge of security tools and frameworks",
                    "Strong analytical and problem-solving skills",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-accent-teal rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Application Form Section */}
          <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-accent-teal mb-6">
              Apply Now
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
                  label: "Email",
                  type: "email",
                  value: formData.email,
                  onChange: (e) =>
                    setFormData({ ...formData, email: e.target.value }),
                },
                {
                  label: "Phone",
                  type: "tel",
                  value: formData.phone,
                  onChange: (e) =>
                    setFormData({ ...formData, phone: e.target.value }),
                },
                {
                  label: "LinkedIn Profile",
                  type: "url",
                  value: formData.linkedinProfile,
                  onChange: (e) =>
                    setFormData({
                      ...formData,
                      linkedinProfile: e.target.value,
                    }),
                },
                {
                  label: "Position Applied For",
                  type: "text",
                  value: formData.position,
                  onChange: (e) =>
                    setFormData({ ...formData, position: e.target.value }),
                },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-white/90 mb-2 font-medium">
                    {field.label}*
                  </label>
                  <input
                    type={field.type}
                    required
                    className="w-full p-3 rounded-lg bg-primary/50 text-white border border-primary-accent/20 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              ))}

              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  Resume (Google Drive Link)*
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  className="w-full p-3 rounded-lg bg-primary/50 text-white border border-primary-accent/20 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all duration-300"
                  value={formData.resumeUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, resumeUrl: e.target.value })
                  }
                />
                <p className="text-sm text-white/60 mt-2">
                  Please provide a shareable Google Drive link to your resume
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-teal text-primary font-semibold px-6 py-3 rounded-lg hover:bg-accent-teal/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
            <p className="text-sm mt-4 text-white/60 text-center">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
