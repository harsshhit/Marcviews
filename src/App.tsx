import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/account/Navigation";
import { HeroSection } from "./components/home/HeroSection";
import { SecurityFeatures } from "./components/home/SecurityFeatures";
import { Categories } from "./components/home/Categories";
import { Footer } from "./components/Footer";
import { ServiceTemplate } from "./components/ServiceTemplate";
import { Cart } from "./components/account/Cart";
import { AuthProfile } from "./components/Profile";
import { servicesData } from "./components/services/services";
import { solutionsData } from "./components/solutions/solutions";
import { aiData } from "./components/ai/ai";
import { companyData } from "./data/company";
import { contactData } from "./data/contact";
import { Appointments } from "./components/contact/Appointments";
import { ContactUs } from "./components/contact/ContactUs";

function HomePage() {
  return (
    <>
      <HeroSection />
      <SecurityFeatures />
      <Categories />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<AuthProfile />} />

            {/* Service Routes */}
            {Object.entries(servicesData).map(([key, data]) => (
              <Route
                key={key}
                path={`/services/${key}`}
                element={<ServiceTemplate data={data} />}
              />
            ))}

            {/* Solutions Routes */}
            {Object.entries(solutionsData).map(([key, data]) => (
              <Route
                key={key}
                path={`/solutions/${key}`}
                element={<ServiceTemplate data={data} />}
              />
            ))}

            {/* AI Routes */}
            {Object.entries(aiData).map(([key, data]) => (
              <Route
                key={key}
                path={`/ai/${key}`}
                element={<ServiceTemplate data={data} />}
              />
            ))}

            {/* Company Routes */}
            {Object.entries(companyData).map(([key, data]) => (
              <Route
                key={key}
                path={`/company/${key}`}
                element={<ServiceTemplate data={data} />}
              />
            ))}

            {/* Contact Routes */}
            {Object.entries(contactData).map(([key, data]) => (
              <Route
                key={key}
                path={`/contact/${key}`}
                element={<ServiceTemplate data={data} />}
              />
            ))}

            <Route path="/contact/appointment" element={<Appointments />} />
            <Route path="/contact/general" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
