// src/components/Appointments.tsx
import React from "react";

const services = [
  { title: "Compliance and Regulatory Assessment", duration: "5 hrs", price: "C$999" },
  { title: "Cyber Resilience Assessment", duration: "5 hrs", price: "C$1,399" },
  { title: "Data Governance-as-a-Service", duration: "1 hr", price: "Contact Sales" },
  { title: "General Consultation/Product Demo/PoC /Solution Assessment", duration: "30 mins", price: "Free" },
  { title: "Disaster Recovery Service", duration: "3 hrs", price: "C$8,999" },
  { title: "Employee Training (Package)", duration: "20 hrs", price: "Contact us" },
  { title: "Personal Cyber Classes (Cyber Defense)", duration: "2 hrs", price: "Contact us" },
  { title: "Ransomware Readiness Assessment", duration: "5 hrs", price: "C$999" }
];

export function Appointments() {
  return (
    <div className="min-h-screen bg-primary text-white p-8 pt-24 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      <div className="grid gap-6">
        {services.map((s, index) => (
          <div key={index} className="bg-secondary-dark p-6 rounded-lg border border-primary-accent/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold">{s.title}</p>
                <p className="text-white/70 text-sm">{s.duration}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{s.price}</p>
                <button className="mt-2 px-4 py-1 bg-accent-teal rounded-lg hover:bg-accent-purple transition text-white">
                  Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Make the payment here!</h2>
        <p className="mb-4">Online Payment: <a href="https://pay.marcviews.com/" className="underline text-accent-teal">https://pay.marcviews.com/</a></p>
        <p>PayPal: Scan or use your PayPal account</p>
      </div>
    </div>
  );
}
