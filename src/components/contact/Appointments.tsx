// src/components/Appointments.tsx
import { useState } from "react";
// import { AppointmentForm } from "./AppointmentForm";

const services = [
  {
    title: "Compliance and Regulatory Assessment",
    duration: "5 hrs",
    price: "C$999",
  },
  { title: "Cyber Resilience Assessment", duration: "5 hrs", price: "C$1,399" },
  {
    title: "Data Governance-as-a-Service",
    duration: "1 hr",
    price: "Contact Sales",
  },
  {
    title: "General Consultation/Product Demo/PoC /Solution Assessment",
    duration: "30 mins",
    price: "Free",
  },
  { title: "Disaster Recovery Service", duration: "3 hrs", price: "C$8,999" },
  {
    title: "Employee Training (Package)",
    duration: "20 hrs",
    price: "Contact us",
  },
  {
    title: "Personal Cyber Classes (Cyber Defense)",
    duration: "2 hrs",
    price: "Contact us",
  },
  {
    title: "Ransomware Readiness Assessment",
    duration: "5 hrs",
    price: "C$999",
  },
];

export function Appointments() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContinue = (service: (typeof services)[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-primary text-white p-8 pt-24 max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
        <p className="text-white/70 text-lg">
          Choose from our range of professional services
        </p>
      </div>

      <div className="grid gap-6">
        {services.map((s, index) => (
          <div
            key={index}
            className="bg-secondary-dark/50 backdrop-blur-sm p-6 rounded-lg border border-primary-accent/20 hover:border-primary-accent/40 transition-colors duration-300"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-xl font-semibold text-white">{s.title}</p>
                <p className="text-white/70 text-sm">{s.duration}</p>
              </div>
              <div className="text-right space-y-2">
                <p className="font-semibold text-red-500">{s.price}</p>
                <button
                  onClick={() => handleContinue(s)}
                  className="px-6 py-2 bg-accent-teal text-white rounded-lg hover:bg-accent-teal/90 transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-secondary-dark/50 backdrop-blur-sm p-8 rounded-lg border border-primary-accent/20">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <p className="mb-4 text-white/70">
          Online Payment:{" "}
          <a
            href="https://pay.marcviews.com/"
            className="text-red-500 hover:text-red-500/80 transition-colors duration-300"
          >
            https://pay.marcviews.com/
          </a>
        </p>
        <p className="text-white/70">PayPal: Scan or use your PayPal account</p>
      </div>

      {isModalOpen && selectedService && (
        <AppointmentForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </div>
  );
}
