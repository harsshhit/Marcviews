import { useState, useEffect } from "react";
import { User, Calendar, LogOut, Settings, Bell, CreditCard, ChevronRight } from "lucide-react";
import bookingService, { Booking } from "../services/bookingService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

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
      if (!authUser) {
        await refreshUserData();
        return;
      }

      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      const formattedUser: UserData = {
        email: authUser.email,
        name: authUser.name,
        role: "User",
        subscription: "Free Plan",
        joinDate: new Date(authUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      };
      setUser(formattedUser);
      fetchBookings();
    };

    initializeProfile();
  }, [authUser, isAuthenticated, navigate, refreshUserData]);

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
      label: "Account",
      id: "account",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Bookings",
      id: "bookings",
      badge: bookings.length,
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      id: "notifications",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Billing",
      id: "billing",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      id: "settings",
    },
  ];

  const renderAccountDetails = () => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl font-semibold text-gray-800">Account Details</h2>
        <button className="text-sm text-accent-teal hover:text-accent-teal/80 font-medium flex items-center gap-1">
          <span>Edit Profile</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-teal/10 to-accent-purple/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-accent-teal" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">{user?.name}</h3>
            <p className="text-gray-500 break-all">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          {[
            { label: "Role", value: user?.role },
            { label: "Subscription", value: user?.subscription },
            { label: "Member Since", value: user?.joinDate },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {label}
              </label>
              <p className="text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="font-medium text-gray-800 group-hover:text-red-600">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h2 className="text-2xl font-semibold text-gray-800">Your Bookings</h2>
        <span className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-sm font-medium rounded-full">
          {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No bookings yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You don't have any bookings at the moment. When you book a service, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full ${booking.status === "confirmed"
                        ? "bg-green-500"
                        : booking.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                    />
                    <span
                      className={`text-xs font-medium ${booking.status === "confirmed"
                        ? "text-green-600"
                        : booking.status === "pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                        }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800">{booking.serviceName}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    {booking.price > 0 && (
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5" />
                        ${booking.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  {booking.notes && (
                    <p className="text-gray-500 text-sm mt-3 p-2 bg-gray-50 rounded-md">
                      {booking.notes}
                    </p>
                  )}
                </div>

                {booking.status === "pending" && (
                  <div className="self-start sm:self-center">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1 border border-red-100 rounded-md hover:bg-red-50"
                      disabled={loading}
                    >
                      {loading ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (!user) return null;
    return (
      <AnimatePresence mode="wait">
        {activeTab === "account" && (
          <motion.div
            key="account"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderAccountDetails()}
          </motion.div>
        )}
        {activeTab === "bookings" && (
          <motion.div
            key="bookings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderBookings()}
          </motion.div>
        )}
        {(activeTab === "notifications" || activeTab === "billing" || activeTab === "settings") && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              {activeTab === "notifications" && <Bell className="w-8 h-8 text-gray-400" />}
              {activeTab === "billing" && <CreditCard className="w-8 h-8 text-gray-400" />}
              {activeTab === "settings" && <Settings className="w-8 h-8 text-gray-400" />}
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This feature is currently under development and will be available soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-teal to-accent-purple rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-medium text-gray-800">{user?.name || "User"}</h2>
                <p className="text-sm text-gray-500">{user?.subscription}</p>
              </div>
            </div>

            <nav className="flex justify-start sm:justify-center">
              <div className="flex space-x-3 overflow-x-auto py-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${activeTab === item.id
                      ? "bg-accent-teal text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    title={item.label}
                  >
                    {item.icon}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
