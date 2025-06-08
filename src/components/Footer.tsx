import React from "react";
import { Shield, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Logo and brand section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-green-600" strokeWidth={2} />
            <span className="ml-3 text-2xl font-bold tracking-tight">
              MarcViews
            </span>
          </div>
          <p className="text-gray-600 max-w-md mb-6">
            Enterprise-grade cybersecurity solutions protecting businesses
            worldwide since 2020.
          </p>
         
        </div>

        {/* Navigation sections */}
        <div className="space-y-8 mb-12">
          {/* Quick Links */}
          <div className="text-center">
            {/* <h4 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-4">
              Quick Links
            </h4> */}
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <a
                  href="/services"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                >
                  <span>Services</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                >
                  <span>Solutions</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="/company/about"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                >
                  <span>About Us</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="/contact/general"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                >
                  <span>Contact</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="/company/careers"
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                >
                  <span>Careers</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            {/* <h4 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-4">
              Contact
            </h4> */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                <p className="text-gray-600">
                  B-41, B-Block, Sector-63, Noida, Uttar Pradesh 201301 (INDIA)
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-600 mr-2" />
                <a
                  href="mailto:contact@marcviews.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  contact@marcviews.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-600 mr-2" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center">
              {/* <h4 className="text-sm font-bold uppercase tracking-wider text-green-600 mb-4">
                Legal
              </h4> */}
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <a
                  href="/legal/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/legal/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/legal/cookies"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="/legal/security"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Security Policy
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom section with copyright */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-sm mb-4">
            &copy; 2025 MarcViews Networks, Inc. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              Do Not Sell My Information
            </button>
            <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
