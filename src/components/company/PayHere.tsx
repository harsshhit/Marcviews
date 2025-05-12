// src/components/PayHere.tsx
import { CreditCard, QrCode } from "lucide-react";

export function PayHere() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16 bg-gradient-to-b from-primary to-secondary-dark text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-accent/20 to-accent-purple/20 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent mb-4">
            Choose a Payment Method
          </h1>
          <p className="text-xl text-white/90">
            Make secure payments with our trusted payment methods
          </p>
        </div>

        <div className="space-y-8">
          {/* Online Payment */}
          <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent-teal/10 rounded-lg">
                <CreditCard className="text-red-500 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-red-500">
                Online Payment
              </h2>
            </div>
            <p className="text-lg text-white/90 mb-6">
              Scan to pay or continue to online payment:
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <a
                href="https://pay.marcviews.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-accent-teal text-white rounded-xl font-semibold hover:bg-accent-teal/90 transition-colors duration-300"
              >
                Continue to Pay
              </a>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-xl">
                  <QrCode className="w-24 h-24 text-red-500" />
                </div>
                <p className="text-sm text-white/70 mt-3">
                  Scan this QR to pay
                </p>
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div className="bg-primary-accent/10 rounded-xl p-8 backdrop-blur-sm hover:bg-primary-accent/20 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent-yellow/10 rounded-lg">
                <img src="/paypal.svg" alt="PayPal" className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-accent-yellow">PayPal</h2>
            </div>
            <p className="text-lg text-white/90 mb-6">
              Pay using your PayPal account:
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <a
                href="https://www.paypal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-accent-yellow text-black rounded-xl font-semibold hover:bg-accent-yellow/90 transition-colors duration-300"
              >
                Pay with PayPal
              </a>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-xl">
                  <QrCode className="w-24 h-24 text-accent-yellow" />
                </div>
                <p className="text-sm text-white/70 mt-3">
                  Scan this QR to pay with PayPal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
