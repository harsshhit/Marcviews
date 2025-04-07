// src/components/ContactUs.tsx
import React from "react";

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
  return (
    <div className="min-h-screen bg-primary text-white px-6 pt-24 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      {/* Location Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="bg-secondary-dark p-6 rounded-xl border border-primary-accent/20"
          >
            <h2 className="text-xl font-semibold mb-2">{loc.city}</h2>
            <p className="text-sm mb-1">{loc.address}</p>
            <p className="text-sm mb-1">Email: {loc.email}</p>
            <p className="text-sm mb-1">Phone: {loc.phone}</p>
            <p className="text-xs mt-2 text-white/50">{loc.timezone}</p>
            {loc.closedToday && (
              <p className="text-sm mt-1 text-red-400 font-semibold">Closed Today</p>
            )}
          </div>
        ))}
      </div>

      {/* Inquiry Form */}
      <div className="bg-secondary-dark p-8 rounded-xl border border-primary-accent/20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Demo, Sales, Pricing & Partnership Inquiries</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-white/70 mb-1">Name*</label>
            <input className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" required />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Email*</label>
            <input type="email" className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" required />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Industry</label>
            <input className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Company Name*</label>
            <input className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" required />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Company Website URL</label>
            <input type="url" className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">Address</label>
            <input className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" />
          </div>
          <div>
            <label className="block text-white/70 mb-1">What would you like us to help you with?*</label>
            <textarea className="w-full p-3 rounded bg-primary text-white border border-primary-accent/20" rows={4} required />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="updates" />
            <label htmlFor="updates" className="text-white/70 text-sm">
              Sign up for updates, promotions, and more.
            </label>
          </div>
          <p className="text-xs text-white/40">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-accent-teal px-6 py-3 rounded-lg hover:bg-accent-purple transition">Send</button>
            <button type="reset" className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
