// src/components/PayHere.tsx
import { CreditCard, QrCode } from "lucide-react";

export function PayHere() {
  return (
    <div className="min-h-screen bg-primary text-white pt-24 px-4 pb-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Choose a Payment Method</h1>

      <p className="text-lg mb-6">Make the payment here!</p>

      <div className="space-y-8">
        {/* Online Payment */}
        <div className="bg-white/5 p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <CreditCard className="text-accent-teal" />
            <h2 className="text-2xl font-semibold">Online Payment</h2>
          </div>
          <p className="mb-3 text-white/80">
            Scan to pay or continue to online payment:
          </p>
          <a
            href="https://pay.marcviews.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent-teal text-white px-6 py-2 rounded-xl font-semibold hover:bg-accent-purple transition"
          >
            Continue to Pay
          </a>
          <div className="mt-4">
            <QrCode className="w-16 h-16 text-white/50" />
            <p className="text-sm text-white/50 mt-2">Scan this QR to pay</p>
          </div>
        </div>

        {/* PayPal */}
        <div className="bg-white/5 p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-4">
            {/* <Paypal className="text-accent-yellow" /> */}
            <h2 className="text-2xl font-semibold">PayPal</h2>
          </div>
          <p className="mb-3 text-white/80">Pay using your PayPal account:</p>
          {/* Placeholder QR Code for PayPal */}
          <div className="mt-4">
            <QrCode className="w-16 h-16 text-white/50" />
            <p className="text-sm text-white/50 mt-2">
              Scan this QR to pay with PayPal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
