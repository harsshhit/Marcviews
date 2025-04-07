import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/home/HeroSection";
import { SecurityFeatures } from "./components/home/SecurityFeatures";
import { Categories } from "./components/home/Categories";
import { Footer } from "./components/Footer";
import { ServiceTemplate } from "./components/ServiceTemplate";
import { Cart } from "./components/account/Cart";
import { AuthProfile } from "./components/account/Profile";
import { servicesData } from "./components/services/services";
import { solutionsData } from "./components/solutions/solutions";
import { aiData } from "./components/ai/ai";
import { contactData } from "./data/contact";
import { Appointments } from "./components/contact/Appointments";
import { ContactUs } from "./components/contact/ContactUs";
import { PayHere } from "./components/company/PayHere";
import { Leadership } from "./components/company/Leadership";
import { Partners } from "./components/company/Partners";
import { FAQs } from "./components/company/FAQs";
import { Events } from "./components/company/Events";
import { Careers } from "./components/company/Careers";
import { Blogs } from "./components/company/Blogs";
import { AboutUs } from "./components/company/AboutUs";

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

            <Route path="/company/about" element={<AboutUs />} />
            <Route path="/company/blogs" element={<Blogs />} />
            <Route path="/company/careers" element={<Careers />} />
            <Route path="/company/events" element={<Events />} />
            <Route path="/company/faqs" element={<FAQs />} />
            <Route path="/company/partners" element={<Partners />} />
            <Route path="/company/leadership" element={<Leadership />} />
            <Route path="/company/payhere" element={<PayHere />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
