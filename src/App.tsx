// import React from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/home/HeroSection";
import { SecurityFeatures } from "./components/home/SecurityFeatures";
import { Categories } from "./components/home/Categories";
import { Footer } from "./components/Footer";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
// import { ServiceTemplate } from "./components/ServiceTemplate";
// import { servicesData } from "./components/services/services";
// import { solutionsData } from "./components/solutions/solutions";
// import { aiData } from "./components/ai/ai";
import { AboutUs } from "./components/company/AboutUs";
import { Blogs } from "./components/company/Blogs";
import { Careers } from "./components/company/Careers";
import { FAQs } from "./components/company/FAQs";
import { Leadership } from "./components/company/Leadership";
import { Partners } from "./components/company/Partners";
import { PayHere } from "./components/company/PayHere";
// import { Appointments } from "./components/contact/Appointments";
import { ContactUs } from "./components/contact/ContactUs";
import { AuthProfile } from "./components/auth/Profile";
import { BlogPost } from "./components/company/BlogPost";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AppointmentForm from "./components/contact/AppointmentForm";
import { Services } from "./components/services/Services";
import { Solutions } from "./components/solutions/Solutions";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { SecurityPolicy } from "./components/legal/SecurityPolicy";
import Dashboard from "./Admin/Dashboard";
import AdminLogin from "./Admin/Login";
import ProtectedRoute from "./Admin/ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/admin/*",
      element: (
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      ),
    },
    {
      path: "/*",
      element: (
        <AppProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-700">
              <Navigation />
              <main className="pt-16">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="space-y-24">
                        <HeroSection />
                        <SecurityFeatures />
                        <Categories />
                      </div>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/company/about" element={<AboutUs />} />
                  <Route path="/company/blogs" element={<Blogs />} />
                  <Route path="/company/blogs/:slug" element={<BlogPost />} />
                  <Route path="/company/careers" element={<Careers />} />
                  <Route path="/company/faqs" element={<FAQs />} />
                  <Route path="/company/leadership" element={<Leadership />} />
                  <Route path="/company/partners" element={<Partners />} />
                  <Route path="/company/payhere" element={<PayHere />} />
                  {/* <Route
                    path="/contact/appointment"
                    element={<Appointments />}
                  />{" "} */}
                  <Route
                    path="/contact/appointmentform"
                    element={<AppointmentForm />}
                  />
                  <Route path="/contact/general" element={<ContactUs />} />
                  <Route path="/profile" element={<AuthProfile />} />
                  <Route path="/legal/privacy" element={<PrivacyPolicy />} />
                  <Route path="/legal/terms" element={<TermsOfService />} />
                  <Route path="/legal/cookies" element={<CookiePolicy />} />
                  <Route path="/legal/security" element={<SecurityPolicy />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </AppProvider>
      ),
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
