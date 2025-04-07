import React, { useState } from 'react';
import { User, Settings, Bell, Shield, CreditCard, LogOut } from 'lucide-react';

const sampleUser = {
  email: "john.doe@example.com",
  password: "password123",
  name: "John Doe",
  role: "Enterprise Client",
  subscription: "Premium Security Package",
  joinDate: "January 2024"
};

export function AuthProfile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email === sampleUser.email && form.password === sampleUser.password) {
      setUser(sampleUser);
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate successful registration
    const newUser = {
      ...form,
      role: "New User",
      subscription: "Free Plan",
      joinDate: "April 2025"
    };
    setUser(newUser);
    setIsLoggedIn(true);
    setError("");
  };

  const toggleAuthMode = () => {
    setForm({ email: "", password: "", name: "" });
    setError("");
    setIsRegistering(!isRegistering);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-dark to-primary p-4">
        <form
          onSubmit={isRegistering ? handleRegister : handleLogin}
          className="bg-secondary-dark/50 p-8 rounded-lg w-full max-w-md border border-primary-accent/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            {isRegistering ? "Register" : "Login"}
          </h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {isRegistering && (
            <div className="mb-4">
              <label className="block text-white/70 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary-dark border border-primary-accent/20 text-white"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-white/70 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-secondary-dark border border-primary-accent/20 text-white"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/70 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-secondary-dark border border-primary-accent/20 text-white"
              required
            />
          </div>

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
            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    );
  }

  const menuItems = [
    { icon: <User className="w-5 h-5" />, label: "Account Details", active: true },
    { icon: <Shield className="w-5 h-5" />, label: "Security" },
    { icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Billing" },
    { icon: <Settings className="w-5 h-5" />, label: "Preferences" }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setForm({ email: "", password: "", name: "" });
    setIsRegistering(false);
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
                <h2 className="text-xl font-semibold text-neutral-white">{user.name}</h2>
                <p className="text-neutral-white/70">{user.role}</p>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-primary-accent/20 text-accent-teal'
                        : 'text-neutral-white/70 hover:bg-primary-accent/10 hover:text-neutral-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-accent-danger/70 hover:text-accent-danger hover:bg-accent-danger/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
              <h2 className="text-2xl font-semibold text-neutral-white mb-6">Account Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-white/70 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-white/70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-white/70 mb-2">
                    Subscription Plan
                  </label>
                  <input
                    type="text"
                    value={user.subscription}
                    disabled
                    className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-white/70 mb-2">
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={user.joinDate}
                    disabled
                    className="w-full bg-secondary-dark border border-primary-accent/20 rounded-lg px-4 py-2 text-neutral-white/70"
                  />
                </div>
              </div>
            </div>

            <div className="bg-secondary-dark/50 backdrop-blur-sm rounded-lg p-8 border border-primary-accent/20">
              <h2 className="text-2xl font-semibold text-neutral-white mb-4">Your Bookings</h2>
              <div className="space-y-4">
                <div className="bg-secondary-dark p-4 rounded-lg border border-primary-accent/10 text-white">
                  <p className="font-semibold">Security Audit - April 15, 2024</p>
                  <p className="text-white/70 text-sm">Status: Confirmed</p>
                </div>
                <div className="bg-secondary-dark p-4 rounded-lg border border-primary-accent/10 text-white">
                  <p className="font-semibold">Consultation Call - April 18, 2024</p>
                  <p className="text-white/70 text-sm">Status: Pending</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
