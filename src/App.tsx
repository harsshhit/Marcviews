import React from "react";
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
import { ServiceTemplate } from "./components/ServiceTemplate";
import { servicesData } from "./components/services/services";
import { solutionsData } from "./components/solutions/solutions";
import { aiData } from "./components/ai/ai";
import { AboutUs } from "./components/company/AboutUs";
import { Blogs } from "./components/company/Blogs";
import { Careers } from "./components/company/Careers";
import { FAQs } from "./components/company/FAQs";
import { Leadership } from "./components/company/Leadership";
import { Partners } from "./components/company/Partners";
import { PayHere } from "./components/company/PayHere";
import { Appointments } from "./components/contact/Appointments";
import { ContactUs } from "./components/contact/ContactUs";
import { AuthProfile } from "./components/account/Profile";
import { BlogPost } from "./components/company/BlogPost";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: (
        <AppProvider>
          <AuthProvider>
            <div className="min-h-screen bg-secondary-dark text-neutral-white">
              <Navigation />
              <main className="pt-16">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <HeroSection />
                        <SecurityFeatures />
                        <Categories />
                      </>
                    }
                  />
                  {Object.entries(servicesData).map(([key, data]) => (
                    <Route
                      key={key}
                      path={`/services/${key}`}
                      element={<ServiceTemplate data={data} />}
                    />
                  ))}
                  {Object.entries(solutionsData).map(([key, data]) => (
                    <Route
                      key={key}
                      path={`/solutions/${key}`}
                      element={<ServiceTemplate data={data} />}
                    />
                  ))}
                  {Object.entries(aiData).map(([key, data]) => (
                    <Route
                      key={key}
                      path={`/ai/${key}`}
                      element={<ServiceTemplate data={data} />}
                    />
                  ))}
                  <Route path="/company/about" element={<AboutUs />} />
                  <Route path="/company/blogs" element={<Blogs />} />
                  <Route path="/company/blogs/:slug" element={<BlogPost />} />
                  <Route path="/company/careers" element={<Careers />} />
                  <Route path="/company/faqs" element={<FAQs />} />
                  <Route path="/company/leadership" element={<Leadership />} />
                  <Route path="/company/partners" element={<Partners />} />
                  <Route path="/company/payhere" element={<PayHere />} />
                  <Route
                    path="/contact/appointment"
                    element={<Appointments />}
                  />
                  <Route path="/contact/general" element={<ContactUs />} />
                  <Route path="/profile" element={<AuthProfile />} />
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
