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
    phone: "",
    industry: "",
    companyName: "",
    companySize: undefined,
    companyWebsite: "",
    address: "",
    country: "",
    inquiry: "",
    inquiryType: "general",
    budget: undefined,
    timeframe: undefined,
    howDidYouHear: "",
    signUpForUpdates: false,
    userId: user?.id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

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
        phone: "",
        industry: "",
        companyName: "",
        companySize: undefined,
        companyWebsite: "",
        address: "",
        country: "",
        inquiry: "",
        inquiryType: "general",
        budget: undefined,
        timeframe: undefined,
        howDidYouHear: "",
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
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Locations</h2>
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {location.city}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>{location.address}</p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      <a href={`mailto:${location.email}`} className="text-green-600 hover:text-green-700 transition-colors">
                        {location.email}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      <a href={location.phone !== "WhatsApp" ? `tel:${location.phone}` : "#"} className="text-green-600 hover:text-green-700 transition-colors">
                        {location.phone}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">{location.timezone}</p>
                    {location.closedToday && (
                      <p className="text-red-500 text-sm">Closed Today</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Us
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 animate-fade-in">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-600 animate-fade-in">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className={`transition-all duration-300 ${activeField === 'name' ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Name*</label>
                  <input
                    className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    required
                    value={formData.name}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className={`transition-all duration-300 ${activeField === 'email' ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Email*</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    required
                    value={formData.email}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className={`transition-all duration-300 ${activeField === 'phone' ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    value={formData.phone || ""}
                    onFocus={() => setActiveField('phone')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Your phone number"
                  />
                </div>
                <div className={`transition-all duration-300 ${activeField === 'company' ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Company Name</label>
                  <input
                    className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    value={formData.companyName}
                    onFocus={() => setActiveField('company')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Your company name"
                  />
                </div>
                <div className={`transition-all duration-300 ${activeField === 'inquiry' ? 'scale-[1.02]' : ''}`}>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">
                    How can we help you?*
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all duration-300"
                    rows={4}
                    required
                    value={formData.inquiry}
                    onFocus={() => setActiveField('inquiry')}
                    onBlur={() => setActiveField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, inquiry: e.target.value })
                    }
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="signUpForUpdates"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    checked={formData.signUpForUpdates}
                    onChange={(e) =>
                      setFormData({ ...formData, signUpForUpdates: e.target.checked })
                    }
                  />
                  <label htmlFor="signUpForUpdates" className="ml-2 text-sm text-gray-600">
                    Keep me updated with news and promotions
                  </label>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow flex-1"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        phone: "",
                        industry: "",
                        companyName: "",
                        companySize: undefined,
                        companyWebsite: "",
                        address: "",
                        country: "",
                        inquiry: "",
                        inquiryType: "general",
                        budget: undefined,
                        timeframe: undefined,
                        howDidYouHear: "",
                        signUpForUpdates: false,
                        userId: user?.id,
                      });
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
