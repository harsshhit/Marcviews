import { useState, useEffect } from "react";
import { User, Calendar, LogOut } from "lucide-react";
import bookingService, { Booking } from "../../services/bookingService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface UserData {
  email: string;
  name: string;
  role: string;
  subscription: string;
  joinDate: string;
}

export function AuthProfile() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user: authUser,
    logout,
    refreshUserData,
  } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeProfile = async () => {
      if (!isAuthenticated || !authUser) {
        await refreshUserData();
      }

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
        fetchBookings();
      }
    };

    initializeProfile();
  }, [isAuthenticated, authUser, navigate, refreshUserData]);

  const fetchBookings = async () => {
    try {
      const bookingsData = await bookingService.getBookings();
      setBookings(bookingsData.data.bookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
  ];

  const renderAccountDetails = () => (
    <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
      <h2 className="text-2xl font-semibold text-neutral-white mb-6">
        Account Details
      </h2>
      <div className="space-y-4">
        {[
          { label: "Name", value: user?.name },
          { label: "Email", value: user?.email },
          { label: "Role", value: user?.role },
          { label: "Subscription", value: user?.subscription },
          { label: "Member Since", value: user?.joinDate },
        ].map(({ label, value }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-neutral-white/70 mb-1">
              {label}
            </label>
            <p className="text-neutral-white">{value}</p>
          </div>
        ))}
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
        Your Bookings
      </h2>
      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-neutral-white/30 mx-auto mb-4" />
          <p className="text-neutral-white/70">
            You don't have any bookings yet
          </p>
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
                        : "bg-red-500/20 text-red-400"
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

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountDetails();
      case "bookings":
        return renderBookings();
      default:
        return renderAccountDetails();
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-6 border border-primary-accent/20">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-b from-red-500 to-black rounded-full flex items-center justify-center mx-auto mb-4">
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
                        ? "bg-accent-purple/20 text-red-500"
                        : "text-neutral-white/70 hover:text-neutral-white hover:bg-primary-accent/10"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-auto bg-accent-purple/20 text-red-500 px-2 py-0.5 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
