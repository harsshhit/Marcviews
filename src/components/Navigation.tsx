import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, ChevronDown, User, Menu, X } from "lucide-react";
import { servicesData } from "./services/services";
import { solutionsData } from "./solutions/solutions";
import { aiData } from "./ai/ai";
import { contactData } from "../data/contact";
import { useAuth } from "../context/AuthContext";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();

  // Create navigation data from route data
  const navigationData = [
    {
      title: "Services",
      path: "/services",
      children: Object.entries(servicesData).map(([key, data]) => ({
        title: data.title,
        path: `/services/${key}`,
      })),
    },
    {
      title: "Solutions",
      path: "/solutions",
      children: Object.entries(solutionsData).map(([key, data]) => ({
        title: data.title,
        path: `/solutions/${key}`,
      })),
    },
    {
      title: "AI",
      path: "/ai",
      children: Object.entries(aiData).map(([key, data]) => ({
        title: data.title,
        path: `/ai/${key}`,
      })),
    },
    {
      title: "Company",
      path: "/company",
      children: [
        { title: "About Us", path: "/company/about" },
        { title: "Blogs", path: "/company/blogs" },
        { title: "Careers", path: "/company/careers" },
        { title: "Events", path: "/company/events" },
        { title: "FAQs", path: "/company/faqs" },
        { title: "Partners", path: "/company/partners" },
        { title: "Leadership", path: "/company/leadership" },
        { title: "Pay Here", path: "/company/payhere" },
      ],
    },
    {
      title: "Contact",
      path: "/contact",
      children: [
        { title: "Appointments", path: "/contact/appointment" },
        { title: "Contact Us", path: "/contact/general" },
        ...Object.entries(contactData).map(([key, data]) => ({
          title: data.title,
          path: `/contact/${key}`,
        })),
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-primary shadow-lg fixed w-full z-50 backdrop-blur-md top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Shield className="h-8 w-8 text-accent-purple group-hover:text-accent-teal transition-colors duration-300" />
              <span className="ml-2 text-xl font-bold text-neutral-white group-hover:text-accent-teal transition-colors duration-300">
                MarcViews
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-neutral-white/80 hover:text-accent-teal transition-all duration-300 ${
                location.pathname === "/" ? "text-accent-teal" : ""
              }`}
            >
              Home
            </Link>

            {navigationData.map((item) => (
              <div key={item.path} className="relative group">
                <div
                  className={`flex items-center text-neutral-white/80 hover:text-accent-teal transition-all duration-300 cursor-pointer ${
                    location.pathname.startsWith(item.path)
                      ? "text-accent-teal"
                      : ""
                  }`}
                >
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-all duration-300" />
                </div>
                <div
                  className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out pt-2"
                  style={{
                    transform: "translateY(-10px)",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <div className="bg-secondary-dark rounded-lg shadow-xl border border-primary-accent/20 overflow-hidden min-w-[240px] backdrop-blur-md">
                    {item.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-3 text-neutral-white/80 hover:text-accent-teal hover:bg-primary-light/20 transition-all duration-300 first:rounded-t-lg last:rounded-b-lg border-b border-primary-accent/10 last:border-b-0"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-neutral-white">
                    Welcome, {user?.name}
                  </span>
                  <Link
                    to="/profile"
                    className="text-neutral-white hover:text-neutral-white transition-colors p-2 rounded-full hover:bg-primary-light"
                  >
                    <User className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-neutral-white hover:text-neutral-white p-2 rounded-full hover:bg-primary-light"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-neutral-white hover:text-neutral-white transition-colors p-2 rounded-full hover:bg-primary-light"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-white/80 hover:text-neutral-white p-2 rounded-lg hover:bg-primary-light transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-secondary-dark border-t border-primary-accent/20`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigationData.map((item) => (
            <div key={item.title} className="relative group">
              <button
                onClick={() => {
                  if (item.children) {
                    // Toggle dropdown
                    setActiveDropdown(
                      activeDropdown === item.title ? null : item.title
                    );
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-primary-accent/20 text-accent-teal"
                    : "text-neutral-white/70 hover:bg-primary-accent/10 hover:text-neutral-white"
                }`}
              >
                <span>{item.title}</span>
                {item.children && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      activeDropdown === item.title ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.children && activeDropdown === item.title && (
                <div className="pl-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === child.path
                          ? "bg-primary-accent/20 text-accent-teal"
                          : "text-neutral-white/70 hover:bg-primary-accent/10 hover:text-neutral-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4 px-4 py-3">
          {isAuthenticated ? (
            <>
              <div className="text-neutral-white">Welcome, {user?.name}</div>
              <Link
                to="/profile"
                className="text-neutral-white hover:text-neutral-white p-2 rounded-full hover:bg-primary-light"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-6 w-6" />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-neutral-white hover:text-neutral-white p-2 rounded-full hover:bg-primary-light"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-neutral-white hover:text-neutral-white p-2 rounded-full hover:bg-primary-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
