import React, { useState, FormEvent, useEffect } from "react";
import { User, CreditCard, LogOut, Calendar } from "lucide-react";
import bookingService, { Booking } from "../../services/bookingService";
import serviceService, { Service } from "../../services/serviceService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface UserData {
  email: string;
  name: string;
  role: string;
  subscription: string;
  joinDate: string;
}

interface FormData {
  email: string;
  password: string;
  name: string;
}

interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export function AuthProfile() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user: authUser,
    login,
    register,
    logout,
  } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isAuthenticated && authUser) {
      const userData: UserData = {
        email: authUser.email,
        name: authUser.name,
        role: "User",
        subscription: "Free Plan",
        joinDate: new Date(authUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      };
      setUser(userData);
      setIsLoggedIn(true);
      fetchBookings();
      fetchServices();
    }
  }, [isAuthenticated, authUser, navigate]);

  const fetchBookings = async () => {
    try {
      const bookingsData = await bookingService.getBookings();
      setBookings(bookingsData.data.bookings);
    } catch (error: Error | unknown) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await serviceService.getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/profile");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.message ||
          apiError.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.password);
      navigate("/profile");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.message ||
          apiError.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleCreateBooking = async (
    serviceId: string,
    bookingDate: string
  ) => {
    try {
      setLoading(true);
      await bookingService.createBooking(serviceId, bookingDate);
      await fetchBookings();
    } catch (error) {
      console.error("Failed to create booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setLoading(true);
      await bookingService.cancelBooking(bookingId);
      await fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-secondary-dark to-primary">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
            <h2 className="text-2xl font-semibold text-neutral-white mb-6">
              {isRegistering ? "Create Account" : "Welcome Back"}
            </h2>

            {error && (
              <div className="bg-accent-danger/20 text-accent-danger p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form
              onSubmit={isRegistering ? handleRegister : handleLogin}
              className="space-y-4"
            >
              {isRegistering && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-white/70 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-white/70 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-white/70 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    email: "raj.mehra@techmail.in",
                    password: "secure@123",
                    name: "Raj Mehra",
                  })
                }
                className="w-full mb-4 bg-accent-teal/20 text-accent-teal px-4 py-2 rounded-lg hover:bg-accent-teal/30 transition"
              >
                Autofill Demo User
              </button>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent-purple to-accent-teal text-white px-4 py-2 rounded-lg hover:shadow-lg"
              >
                {isRegistering ? "Register" : "Login"}
              </button>

              <button
                type="button"
                onClick={toggleAuthMode}
                className="mt-4 text-sm text-white/70 hover:text-white underline block text-center"
              >
                {isRegistering
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Account Details",
      id: "account",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Bookings",
      id: "bookings",
      badge: bookings.length,
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Billing",
      id: "billing",
    },
  ];

  const renderAccountDetails = () => (
    <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
      <h2 className="text-2xl font-semibold text-neutral-white mb-6">
        Account Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-white/70 mb-1">
            Name
          </label>
          <p className="text-neutral-white">{user?.name}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-white/70 mb-1">
            Email
          </label>
          <p className="text-neutral-white">{user?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-white/70 mb-1">
            Role
          </label>
          <p className="text-neutral-white">{user?.role}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-white/70 mb-1">
            Subscription
          </label>
          <p className="text-neutral-white">{user?.subscription}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-white/70 mb-1">
            Member Since
          </label>
          <p className="text-neutral-white">{user?.joinDate}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center space-x-2 text-accent-danger/70 hover:text-accent-danger transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
      <h2 className="text-2xl font-semibold text-neutral-white mb-6">
        Your Bookings & Submissions
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-neutral-white/30 mx-auto mb-4" />
          <p className="text-neutral-white/70 mb-4">
            You don't have any bookings or submissions yet
          </p>
          <button
            onClick={() => setActiveTab("services")}
            className="bg-accent-teal/20 text-accent-teal px-4 py-2 rounded-lg hover:bg-accent-teal/30 transition"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-secondary-dark p-4 rounded-lg border border-primary-accent/10 text-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{booking.serviceName}</p>
                  <p className="text-white/70 text-sm">
                    Date: {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  {booking.price > 0 && (
                    <p className="text-white/70 text-sm">
                      Price: ${booking.price.toFixed(2)}
                    </p>
                  )}
                  {booking.notes && (
                    <p className="text-white/70 text-sm mt-2">
                      {booking.notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : booking.status === "cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                  {booking.status === "pending" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-2 text-accent-danger/70 hover:text-accent-danger text-sm"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
      <h2 className="text-2xl font-semibold text-neutral-white mb-6">
        Available Services
      </h2>

      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-neutral-white/70">
            No services available at the moment
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-secondary-dark p-4 rounded-lg border border-primary-accent/10 text-white"
            >
              <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
              <p className="text-white/70 text-sm mb-4">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-accent-teal">
                  ${service.price.toFixed(2)}
                </span>
                <button
                  onClick={() =>
                    handleCreateBooking(service._id, new Date().toISOString())
                  }
                  className="bg-accent-purple/20 text-accent-purple px-3 py-1 rounded-lg hover:bg-accent-purple/30 transition"
                  disabled={loading}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountDetails();
      case "bookings":
        return renderBookings();
      case "services":
        return renderServices();
      default:
        return renderAccountDetails();
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-secondary-dark to-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-6 border border-primary-accent/20">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-accent-purple to-accent-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-neutral-white" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-white">
                  {user?.name}
                </h2>
                <p className="text-neutral-white/70">{user?.role}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-accent-purple/20 text-accent-purple"
                        : "text-neutral-white/70 hover:text-neutral-white hover:bg-primary-accent/10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-auto bg-accent-purple/20 text-accent-purple px-2 py-0.5 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
