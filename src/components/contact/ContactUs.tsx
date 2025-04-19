// src/components/ContactUs.tsx

import { useState } from "react";
import formService from "../../services/formService";
import type { ContactFormData } from "../../services/formService";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

const locations = [
  {
    city: "Toronto, Canada (HQ)",
    email: "contact@marcviews.com",
    phone: "+1-416-820-0689",
    address: "111 Queen St. East, South Building, Suite 450, Toronto, M5C 1S2",
    timezone: "All times are in EST",
    closedToday: true,
  },
  {
    city: "Mississauga, ON",
    email: "contact@marcviews.com",
    phone: "+1-416-820-0689",
    address: "90 Burnhamthorpe Road West, Suite 1400, Mississauga, ON",
    timezone: "All times are in EST",
    closedToday: true,
  },
  {
    city: "Noida, UP, India (Service Delivery Center)",
    email: "sales@marcviews.com",
    phone: "WhatsApp",
    address:
      "Suite 004, B-41, S3V Business Park, Sector 63, Noida, Gautam Buddha Nagar, Uttar Pradesh, India",
    timezone: "All times are in IST",
    closedToday: true,
  },
];

export function ContactUs() {
  const { showNotification } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState<ContactFormData>({
    name: user?.name || "",
    email: user?.email || "",
    industry: "",
    companyName: "",
    companyWebsite: "",
    address: "",
    inquiry: "",
    signUpForUpdates: false,
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
      await formService.submitContact(formData);
      setSuccessMessage("Your message has been sent successfully!");
      showNotification({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        industry: "",
        companyName: "",
        companyWebsite: "",
        address: "",
        inquiry: "",
        signUpForUpdates: false,
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
    <div className="pt-24 pb-16 min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Locations</h2>
            <div className="space-y-8">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-secondary-dark/50 backdrop-blur-sm p-6 rounded-lg border border-primary-accent/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {location.city}
                  </h3>
                  <div className="space-y-2 text-white/70">
                    <p>{location.address}</p>
                    <p>Email: {location.email}</p>
                    <p>Phone: {location.phone}</p>
                    <p className="text-sm">{location.timezone}</p>
                    {location.closedToday && (
                      <p className="text-accent-danger">Closed Today</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              Demo, Sales, Pricing & Partnership Inquiries
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded text-green-500">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 mb-1">Name*</label>
                <input
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Email*</label>
                <input
                  type="email"
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Industry</label>
                <input
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">
                  Company Name*
                </label>
                <input
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">
                  Company Website URL
                </label>
                <input
                  type="url"
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  value={formData.companyWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, companyWebsite: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Address</label>
                <input
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">
                  What would you like us to help you with?*
                </label>
                <textarea
                  className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20"
                  rows={4}
                  required
                  value={formData.inquiry}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiry: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-teal px-6 py-3 rounded-lg hover:bg-accent-purple transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      industry: "",
                      companyName: "",
                      companyWebsite: "",
                      address: "",
                      inquiry: "",
                      userId: user?.id,
                    });
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  disabled={isSubmitting}
                  className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
