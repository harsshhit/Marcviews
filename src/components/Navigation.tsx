import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, ChevronDown, User, Menu, X } from "lucide-react";
// import { servicesData } from "./services/services";
// import { solutionsData } from "./solutions/solutions";
// import { aiData } from "./ai/ai";
// import { contactData } from "../data/contact";
import { useAuth } from "../context/AuthContext";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Create navigation data from route data
  // const navigationData = [
  //   {
  //     title: "Services",
  //     path: "/services",
  //     children: Object.entries(servicesData).map(([key, data]) => ({
  //       title: data.title,
  //       path: `/services/${key}`,
  //     })),
  //   },
  //   {
  //     title: "Solutions",
  //     path: "/solutions",
  //     children: Object.entries(solutionsData).map(([key, data]) => ({
  //       title: data.title,
  //       path: `/solutions/${key}`,
  //     })),
  //   },
  //   {
  //     title: "AI",
  //     path: "/ai",
  //     children: Object.entries(aiData).map(([key, data]) => ({
  //       title: data.title,
  //       path: `/ai/${key}`,
  //     })),
  //   },
  //   {
  //     title: "Company",
  //     path: "/company",
  //     children: [
  //       { title: "About Us", path: "/company/about" },
  //       { title: "Blogs", path: "/company/blogs" },
  //       { title: "Careers", path: "/company/careers" },
  //       { title: "Events", path: "/company/events" },
  //       { title: "FAQs", path: "/company/faqs" },
  //       { title: "Partners", path: "/company/partners" },
  //       { title: "Leadership", path: "/company/leadership" },
  //       { title: "Pay Here", path: "/company/payhere" },
  //     ],
  //   },
  //   {
  //     title: "Contact",
  //     path: "/contact",
  //     children: [
  //       { title: "Appointments", path: "/contact/appointment" },
  //       { title: "Contact Us", path: "/contact/general" },
  //       ...Object.entries(contactData).map(([key, data]) => ({
  //         title: data.title,
  //         path: `/contact/${key}`,
  //       })),
  //     ],
  //   },
  // ];

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Dynamic navigation items for demo
  const navItems = ["Home"];

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-gradient-to-r from-white/95 via-white/90 to-red-50/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-white/80 via-white/75 to-red-50/80 backdrop-blur-sm py-4"
      }`}
      style={{
        backgroundImage: scrolled
          ? "radial-gradient(circle at 15% 50%, rgba(255, 0, 0, 0.03) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(255, 0, 0, 0.05) 0%, transparent 33%)"
          : "radial-gradient(circle at 15% 50%, rgba(255, 0, 0, 0.05) 0%, transparent 35%), radial-gradient(circle at 85% 30%, rgba(255, 0, 0, 0.07) 0%, transparent 40%)",
      }}
    >
      <div className="max-w-full mx-auto px-4 relative py-2">
        <div className="absolute -inset-x-4 top-0 h-px bg-gradient-to-r from-red-500/10 via-red-500/50 to-red-500/10"></div>
        <div className="absolute -inset-x-4 bottom-0 h-px bg-gradient-to-r from-red-500/10 via-red-500/30 to-red-500/10"></div>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center group relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center bg-white p-1 rounded-full">
                <Shield className="h-8 w-8 text-red-500 transition-all duration-500 transform group-hover:scale-110" />
                <span className="ml-2 text-xl font-extrabold text-slate-800 transition-all duration-500 group-hover:tracking-wider">
                  MarcViews
                </span>
              </div>
              <div className="absolute -inset-1 rounded-lg opacity-0 bg-gradient-to-r from-red-50/50 to-transparent transition-all duration-500 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-300 via-red-500 to-red-300 transition-all duration-500 group-hover:w-full"></div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-bold bg-white p-1 rounded-full">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`relative px-3 py-2 text-black transition-all duration-300 overflow-hidden  ${
                  (item === "Home" && location.pathname === "/") ||
                  (item !== "Home" &&
                    location.pathname.startsWith(`/${item.toLowerCase()}`))
                    ? "text-red-500"
                    : ""
                }`}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className="relative z-10">{item}</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 via-red-500 to-red-400 transform transition-transform duration-300 ${
                    hoveredItem === item ? "translate-x-0" : "-translate-x-full"
                  }`}
                />
              </Link>
            ))}

            {/* {navigationData.map((item) => (
              <div key={item.path} className="relative group">
                <div
                  className={`flex items-center text-black  transition-all duration-300 cursor-pointer ${
                    location.pathname.startsWith(item.path)
                      ? "text-red-500"
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
                  <div className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden min-w-[240px] backdrop-blur-md">
                    {item.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-3 text-black  hover:bg-gray-50 transition-all duration-300 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))} */}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-black transition-all duration-300 opacity-80 hover:opacity-100">
                    Welcome, {user?.name}
                  </span>
                  <Link
                    to="/profile"
                    className="relative text-white bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full overflow-hidden transition-all duration-300 hover:shadow-md group"
                  >
                    <User className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 transform scale-0 transition-transform duration-300 group-hover:scale-100 rounded-full" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full text-black border border-transparent hover:border-red-300 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Logout</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-50 to-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-black border border-transparent hover:border-red-300 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Login</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-50 to-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white transition-all duration-300 relative overflow-hidden group hover:shadow-lg"
                  >
                    <span className="relative z-10">Register</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black p-2 rounded-lg transition-all duration-300 relative overflow-hidden group"
              aria-label="Toggle menu"
            >
              <div className="relative z-10">
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform transition-transform duration-300 group-hover:rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
              <span className="absolute inset-0 bg-red-50 transform scale-0 transition-transform duration-300 group-hover:scale-100 rounded-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`md:hidden bg-gradient-to-b from-white to-red-50/30 border-t border-gray-100 shadow-md transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255, 0, 0, 0.03) 0%, transparent 25%)",
        }}
      >
        {/* <div className="px-2 pt-2 pb-3 space-y-1">
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
                    ? "bg-gray-100 text-red-500"
                    : "text-black hover:bg-gray-50 hover:text-slate-800"
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
                          ? "bg-gray-100 text-red-500"
                          : "text-black hover:bg-gray-50 hover:text-slate-800"
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
        </div> */}

        <div className="flex flex-col space-y-4 px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={`px-3 py-2 rounded-md transition-all duration-300 ${
                (item === "Home" && location.pathname === "/") ||
                (item !== "Home" &&
                  location.pathname.startsWith(`/${item.toLowerCase()}`))
                  ? "bg-red-50 text-red-500 border-l-4 border-red-500"
                  : "text-black hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <div className="border-t border-gray-100 pt-4">
            {isAuthenticated ? (
              <>
                <div className="text-black font-medium mb-2">
                  Welcome, {user?.name}
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gradient-to-r from-red-50 to-red-100/50 text-red-700 transition-all duration-300 hover:bg-red-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-md text-black hover:bg-gray-50 transition-all duration-300 text-left"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-black hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md bg-gradient-to-r from-red-700 to-red-600 text-white hover:from-red-800 hover:to-red-700 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
