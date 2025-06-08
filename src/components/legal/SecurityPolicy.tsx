import React from "react";
import { Shield } from "lucide-react";

export function SecurityPolicy() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900 ml-4">
            Security Policy
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Security Measures
            </h2>
            <p className="text-gray-600 mb-4">
              We implement various security measures to protect your
              information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Network security monitoring</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Data Protection
            </h2>
            <p className="text-gray-600 mb-4">We protect your data through:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Secure data storage and transmission</li>
              <li>Regular backups and disaster recovery</li>
              <li>Data access controls</li>
              <li>Data retention policies</li>
              <li>Privacy by design principles</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Security Best Practices
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Password Security
                </h3>
                <p className="text-gray-600">
                  Use strong, unique passwords and enable two-factor
                  authentication when available.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Device Security
                </h3>
                <p className="text-gray-600">
                  Keep your devices and software up to date with the latest
                  security patches.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Network Security
                </h3>
                <p className="text-gray-600">
                  Use secure networks and avoid public Wi-Fi when accessing
                  sensitive information.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Reporting Security Issues
            </h2>
            <p className="text-gray-600 mb-4">
              If you discover a security vulnerability, please report it to us
              immediately at{" "}
              <a
                href="mailto:security@marcviews.com"
                className="text-green-600 hover:text-green-700"
              >
                security@marcviews.com
              </a>
              . We appreciate your help in keeping our services secure.
            </p>
            <p className="text-gray-600">
              Please include the following information in your report:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Description of the vulnerability</li>
              <li>Steps to reproduce the issue</li>
              <li>Potential impact</li>
              <li>Your contact information</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Contact Us
            </h2>
            <p className="text-gray-600">
              For any security-related questions or concerns, please contact our
              security team at{" "}
              <a
                href="mailto:security@marcviews.com"
                className="text-green-600 hover:text-green-700"
              >
                security@marcviews.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
