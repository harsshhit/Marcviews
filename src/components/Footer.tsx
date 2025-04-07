import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary-dark to-primary text-neutral-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-accent-purple" />
              <span className="ml-2 text-xl font-bold text-neutral-white">
                MarcViews
              </span>
            </div>
            <p className="text-neutral-white/70">Leading provider of enterprise-grade cybersecurity solutions, protecting businesses worldwide since 2020.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-teal">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Services</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Solutions</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-purple">Contact</h4>
            <p className="text-neutral-white/70">
              111 Queen St. E, S. Building,<br />
              Suite 450, Toronto, ON,<br />
              M5C 1S2
            </p>
            <div className="mt-4">
              <p className="text-neutral-white/70">Email: contact@marcviews.com</p>
              <p className="text-neutral-white/70">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-teal">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-neutral-white/70 hover:text-neutral-white transition-colors">Security Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-accent/20 mt-8 pt-8 text-center">
          <p className="text-neutral-white/70">&copy; 2025 MarcViews Networks, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}