import React from "react";
import { Cookie } from "lucide-react";

export function CookiePolicy() {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Cookie className="h-8 w-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900 ml-4">
            Cookie Policy
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. What Are Cookies
            </h2>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit our website. They are widely used to
              make websites work more efficiently and provide a better user
              experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
              <li>Marketing and advertising</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Essential Cookies
                </h3>
                <p className="text-gray-600">
                  Required for the website to function properly. These cannot be
                  disabled.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Performance Cookies
                </h3>
                <p className="text-gray-600">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Functionality Cookies
                </h3>
                <p className="text-gray-600">
                  Remember your preferences and settings for a better
                  experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Marketing Cookies
                </h3>
                <p className="text-gray-600">
                  Used to track visitors across websites for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Managing Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in your browser settings.
              Please note that disabling certain cookies may affect the
              functionality of our website.
            </p>
            <p className="text-gray-600">
              To learn more about cookies and how to manage them, visit{" "}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700"
              >
                aboutcookies.org
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about our Cookie Policy, please contact
              us at{" "}
              <a
                href="mailto:privacy@marcviews.com"
                className="text-green-600 hover:text-green-700"
              >
                privacy@marcviews.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
