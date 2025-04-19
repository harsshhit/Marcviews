import { useState } from "react";
import formService from "../../services/formService";
import type { AppointmentFormData } from "../../services/formService";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    _id: string;
    title: string;
    duration: string;
    price: string;
  };
}

export function AppointmentModal({
  isOpen,
  onClose,
  service,
}: AppointmentModalProps) {
  const { showNotification } = useApp();
  const { user } = useAuth();
  const [formData, setFormData] = useState<
    Omit<AppointmentFormData, "service">
  >({
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
        service,
      });
      showNotification({
        type: "success",
        message: "Appointment booked successfully!",
      });
      onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-primary p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">
          Book Appointment
        </h2>

        <div className="mb-4 p-4 bg-secondary-dark/50 rounded-lg">
          <h3 className="font-medium text-white">{service.title}</h3>
          <p className="text-white/70 text-sm">
            Duration: {service.duration} | Price: ${service.price}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-white/70 mb-1 text-sm">Name*</label>
            <input
              type="text"
              required
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">Email*</label>
            <input
              type="email"
              required
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">Phone*</label>
            <input
              type="tel"
              required
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">Date*</label>
            <input
              type="date"
              required
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">Time*</label>
            <input
              type="time"
              required
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1 text-sm">Notes</label>
            <textarea
              className="w-full p-2 rounded bg-primary text-white border border-primary-accent/20 text-sm"
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-teal text-white py-2 rounded-lg hover:bg-accent-teal/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
