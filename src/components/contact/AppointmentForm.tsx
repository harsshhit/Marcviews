import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// This would normally be imported from your service
const sampleService = {
  _id: "consultation-001",
  title: "Consultation",
  duration: "30 mins",
  price: "Free",
};

export default function AppointmentForm() {
  // Get the authenticated user from AuthContext
  const { user } = useAuth();
  // Mock notification function (should be replaced with actual notification context)
  const showNotification = (notification: { type: string; message: string }) => console.log(notification);

  const [formData, setFormData] = useState({
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);

      showNotification({
        type: "success",
        message: "Appointment booked successfully!",
      });

      // Reset success state after animation
      setTimeout(() => {
        setSuccess(false);
        // Reset form after success, using current user data
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          date: "",
          time: "",
          notes: "",
          userId: user?.id,
        });
      }, 2000);
    }, 1500);
  };

  const inputClasses = "w-full p-3 rounded-lg bg-white text-slate-700 border border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all duration-300 hover:border-slate-300";

  const labelClasses = "flex items-center text-sm font-medium text-slate-600 mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4 py-10">
      <div className="bg-white text-slate-700 shadow-lg rounded-xl p-8 w-full max-w-xl border border-slate-100 transition-all duration-500 hover:shadow-xl">

        <div className="mb-8 relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-2 text-slate-800">Book Appointment</h2>
          <div className="h-1 w-20 bg-green-400 rounded-full mb-6 transform transition-all duration-500 hover:w-32"></div>

          <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100 mb-6 transform transition-all duration-300 hover:translate-y-1 hover:shadow-md">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg mr-4">
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-slate-800">{sampleService.title}</h3>
              <div className="flex items-center mt-1 text-sm text-slate-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{sampleService.duration}</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-green-500">{sampleService.price}</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-green-500 flex items-start space-x-2 animate-fade-in">
            <div className="mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>{error}</div>
          </div>
        )}

        {!success ? (
          <div className="space-y-5 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className={labelClasses}>
                  <User className="h-4 w-4 mr-2 text-green-400" />
                  Name
                </label>
                <input
                  type="text"
                  required
                  className={inputClasses}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>

              <div className="group">
                <label className={labelClasses}>
                  <Mail className="h-4 w-4 mr-2 text-green-400" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="group">
              <label className={labelClasses}>
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                className={inputClasses}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className={labelClasses}>
                  <Calendar className="h-4 w-4 mr-2 text-green-400" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  className={inputClasses}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="group">
                <label className={labelClasses}>
                  <Clock className="h-4 w-4 mr-2 text-green-400" />
                  Time
                </label>
                <input
                  type="time"
                  required
                  className={inputClasses}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="group">
              <label className={labelClasses}>
                <FileText className="h-4 w-4 mr-2 text-green-400" />
                Additional Notes
              </label>
              <textarea
                rows={3}
                className={inputClasses}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests or information..."
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Book Appointment</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Appointment Booked!</h3>
            <p className="text-slate-500 text-center mb-4">We've sent a confirmation to your email.</p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
          By booking an appointment, you agree to our terms of service and privacy policy.
        </div>
      </div>
    </div>
  );
}