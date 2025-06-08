import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, ChevronDown, User, Menu, X } from "lucide-react";
// import { contactData } from "../data/contact";
import { useAuth } from "../context/AuthContext";

// Add global style for menu-open class
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    body.menu-open {
      overflow: hidden;
    }

    .mobile-menu-container {
      max-height: calc(100vh - 60px);
      overflow-y: auto;
    }
  `;
  document.head.appendChild(style);
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Create navigation data from route data
  const navigationData = [
    // {
    //   title: "Services",
    //   path: "/services",
    //   children: [
    //     { title: "Cyber Assessments", path: "/services/cyber-assessments" },
    //     { title: "Cloud Migration", path: "/services/cloud-migration" },
    //     { title: "Consulting", path: "/services/consulting" },
    //     { title: "Physical Security", path: "/services/physical-security" },
    //   ],
    // },
    // {
    //   title: "Solutions",
    //   path: "/solutions",
    //   children: [
    //     { title: "Cloud Security", path: "/solutions/cloud-security" },
    //     { title: "Data Security", path: "/solutions/data-security" },
    //     { title: "Email Security", path: "/solutions/email-security" },
    //     { title: "Endpoint Security", path: "/solutions/endpoint-security" },
    //   ],
    // },
    // {
    //   title: "AI",
    //   path: "/ai",
    //   children: [
    //     { title: "AI Security", path: "/ai/security" },
    //     { title: "Machine Learning", path: "/ai/machine-learning" },
    //     { title: "Automation", path: "/ai/automation" },
    //   ],
    // },
    {
      title: "Company",
      path: "/company",
      children: [
        { title: "About Us", path: "/company/about" },
        { title: "Blogs", path: "/company/blogs" },
        { title: "Careers", path: "/company/careers" },
        { title: "FAQs", path: "/company/faqs" },
        { title: "Leadership", path: "/company/leadership" },
        { title: "Partners", path: "/company/partners" },
        { title: "Pay Here", path: "/company/payhere" },
      ],
    },
    {
      title: "Contact",
      path: "/contact",
      children: [
        { title: "Contact Us", path: "/contact/general" },
        { title: "Appointments", path: "/contact/appointmentform" },

        // })),
      ],
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu
  useEffect(() => {
    // Add a class to the body when menu is open
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-dropdown-container")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-full mx-auto px-4 relative">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShieldCheck className="h-7 w-7 text-green-600" />
              <span className="ml-2 text-xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                MarcViews
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-gray-700 transition-all duration-300 text-sm font-medium py-2 px-1 hover:text-green-500 ${
                location.pathname === "/" ? "text-green-500" : ""
              }`}
            >
              Home
            </Link>
            {navigationData.map((item) => (
              <div key={item.path} className="relative group">
                <div
                  className={`flex items-center text-gray-700 text-sm font-medium py-2 px-1 transition-all duration-300 cursor-pointer hover:text-green-500 ${
                    location.pathname.startsWith(item.path)
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {item.title}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </div>
                <div className="absolute left-0 top-full invisible group-hover:visible transition-all duration-200 pt-1">
                  <div className="bg-white shadow-lg rounded-sm min-w-[200px]">
                    {item.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              aria-label="Search"
              className="text-gray-700 hover:text-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <div className="relative user-dropdown-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
                className="text-gray-700 hover:text-green-500"
              >
                <User className="h-5 w-5" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/contact/appointmentform"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Book Appointment
                      </Link>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-500"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <div className="p-3 flex items-center space-x-3">
              <button
                onClick={() => {
                  setActiveDropdown(
                    activeDropdown === "account" ? null : "account"
                  );
                }}
                aria-label="Account"
                className="text-gray-700 hover:text-green-500 p-2"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-1 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
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
        className={`md:hidden bg-white transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "mobile-menu-container border-t border-gray-200"
            : "max-h-0"
        } overflow-y-auto`}
        style={{
          position: isMenuOpen ? "fixed" : "absolute",
          top: "60px",
          left: 0,
          right: 0,
          zIndex: 40,
          bottom: isMenuOpen ? 0 : "auto",
        }}
      >
        <div className="px-3 py-2 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium ${
              location.pathname === "/" ? "text-green-500" : "text-gray-700"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {navigationData.map((item) => (
            <div key={item.title} className="relative">
              <button
                onClick={() => {
                  if (item.children) {
                    // Toggle dropdown
                    setActiveDropdown(
                      activeDropdown === item.title ? null : item.title
                    );
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium ${
                  location.pathname === item.path
                    ? "text-green-500"
                    : "text-gray-700"
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
                      className={`block px-3 py-2 text-base font-medium ${
                        location.pathname === child.path
                          ? "text-green-500"
                          : "text-gray-700 hover:text-green-500"
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

          <div className="pt-2 space-y-1 border-t border-gray-200 mt-2">
            <div className="relative">
              <button
                onClick={() => {
                  setActiveDropdown(
                    activeDropdown === "account" ? null : "account"
                  );
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700"
              >
                <span>Account</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    activeDropdown === "account" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "account" && (
                <div className="pl-4 space-y-1">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-base font-medium text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/contact/appointmentform"
                        className="block px-3 py-2 text-base font-medium text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Book Appointment
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-2 text-base font-medium text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 text-base font-medium text-gray-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
