import { useState } from "react";
import formService from "../../services/formService";
import type { AppointmentFormData } from "../../services/formService";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

const sampleService = {
  _id: "consultation-001",
  title: "Security Consultation",
  duration: "30 mins",
  price: "Free",
};

export function AppointmentForm() {
  const { showNotification } = useApp();
  const { user } = useAuth();

  const [formData, setFormData] = useState<Omit<AppointmentFormData, "service">>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    notes: "",
    userId: user?.id,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await formService.submitAppointment({
        ...formData,
        service: sampleService,
      });
      showNotification({
        type: "success",
        message: "Appointment booked successfully!",
      });

      // Reset form after success
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        date: "",
        time: "",
        notes: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E1628] to-[#1a1f3c] px-4 py-10">
      <div className="bg-[#1F2A48] text-white shadow-xl rounded-2xl p-8 w-full max-w-xl border border-white/10">
        <h2 className="text-3xl font-semibold mb-6 text-center">Book Appointment</h2>

        <div className="mb-6 bg-[#2D3C60] p-4 rounded-xl">
          <h3 className="text-lg font-medium">{sampleService.title}</h3>
          <p className="text-sm text-white/70 mt-1">
            ⏱ {sampleService.duration} &nbsp; | &nbsp; 💸 {sampleService.price}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-600/10 border border-red-600 rounded text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Name*", value: formData.name, type: "text", key: "name" },
            { label: "Email*", value: formData.email, type: "email", key: "email" },
            { label: "Phone*", value: formData.phone, type: "tel", key: "phone" },
            { label: "Date*", value: formData.date, type: "date", key: "date" },
            { label: "Time*", value: formData.time, type: "time", key: "time" },
          ].map(({ label, value, type, key }) => (
            <div key={key}>
              <label className="block text-sm text-white/80 mb-1">{label}</label>
              <input
                type={type}
                required
                className="w-full p-3 rounded-md bg-[#2D3C60] text-white border border-white/10 focus:ring-2 focus:ring-accent-teal outline-none text-sm"
                value={value}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
            </div>
          ))}

          <div>
            <label className="block text-sm text-white/80 mb-1">Notes</label>
            <textarea
              rows={3}
              className="w-full p-3 rounded-md bg-[#2D3C60] text-white border border-white/10 focus:ring-2 focus:ring-accent-teal outline-none text-sm"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-teal hover:bg-accent-teal/90 text-white py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
