import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define proper types for our data
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  inquiryType: string;
  status: string;
}

interface Partner {
  _id: string;
  name: string;
  company: string;
  status: string;
}

interface Booking {
  _id: string;
  serviceName: string;
  bookingDate: string;
  status: string;
  paymentStatus: string;
}

interface Appointment {
  _id: string;
  name: string;
  service: {
    title: string;
  };
  date: string;
  status: string;
}

interface Service {
  _id: string;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
}

interface Career {
  _id: string;
  name: string;
  position: string;
  status: string;
}

interface BaseRecord {
  _id: string;
  [key: string]: unknown;
}

interface Data {
  users: User[];
  contacts: Contact[];
  partners: Partner[];
  bookings: Booking[];
  appointments: Appointment[];
  services: Service[];
  careers: Career[];
}

interface SortConfig {
  key: string;
  direction: "ascending" | "descending";
}

interface FilterConfig {
  key: string;
  value: string;
}

// Add date range filter interface
interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

interface DetailViewProps {
  data: BaseRecord;
  type: string;
  onClose: () => void;
}

// Create axios instance with base URL and auth header
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Type guard for ReactNode
function isReactNode(x: unknown): x is React.ReactNode {
  return x !== null && x !== undefined && typeof x !== "boolean";
}

const DetailView: React.FC<DetailViewProps> = ({ data, type, onClose }) => {
  const renderField = (key: string, value: unknown): React.ReactNode | null => {
    // Skip internal fields
    if (
      key === "_id" ||
      key === "__v" ||
      key === "createdAt" ||
      key === "updatedAt"
    ) {
      return null;
    }

    if (value === null || value === undefined) return null;
    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">{key}</h4>
          <div className="pl-4 border-l-2 border-slate-200">
            {Object.entries(value as Record<string, unknown>)
              .map(([subKey, subValue]) => renderField(subKey, subValue))
              .filter(isReactNode)}
          </div>
        </div>
      );
    }
    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">{key}</h4>
          <div className="pl-4 border-l-2 border-slate-200">
            {value.map((item, index) => (
              <div key={index} className="mb-2">
                {typeof item === "object" && item !== null
                  ? Object.entries(item as Record<string, unknown>)
                      .map(([subKey, subValue]) =>
                        renderField(subKey, subValue)
                      )
                      .filter(isReactNode)
                  : String(item)}
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value instanceof Date
    ) {
      return (
        <div key={key} className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-1">{key}</h4>
          <p className="text-slate-600">
            {value instanceof Date ? value.toLocaleString() : String(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-800">
              {type.charAt(0).toUpperCase() + type.slice(1)} Details
            </h3>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {Object.entries(data)
              .filter(([key]) => key !== "_id")
              .map(([key, value]) => renderField(key, value))
              .filter(isReactNode)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState<Data>({
    users: [],
    contacts: [],
    partners: [],
    bookings: [],
    appointments: [],
    services: [],
    careers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "ascending",
  });
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilter>({
    startDate: "",
    endDate: "",
  });
  const [selectedDetail, setSelectedDetail] = useState<{
    data: BaseRecord;
    type: string;
  } | null>(null);

  // Function to handle sorting
  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Function to handle filtering
  const handleFilter = (key: string, value: string) => {
    const newFilters = filters.filter((f) => f.key !== key);
    if (value) {
      newFilters.push({ key, value });
    }
    setFilters(newFilters);
  };

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Function to handle row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Function to handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on selected rows:`, selectedRows);
    // Implement your bulk action logic here
  };

  // Function to get sorted and filtered data
  const getProcessedData = <T extends BaseRecord>(data: T[]) => {
    let processedData = [...data];

    // Apply date range filter if dates are selected
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      const start = new Date(dateRangeFilter.startDate);
      const end = new Date(dateRangeFilter.endDate);
      processedData = processedData.filter((item) => {
        const itemDate = new Date(item.createdAt as string);
        return itemDate >= start && itemDate <= end;
      });
    }

    // Apply search filter
    if (searchQuery) {
      processedData = processedData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison = String(aValue).localeCompare(String(bValue));
        return sortConfig.direction === "ascending" ? comparison : -comparison;
      });
    }

    return processedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          users,
          contacts,
          partners,
          bookings,
          appointments,
          services,
          careers,
        ] = await Promise.all([
          api.get("/api/admin/users"),
          api.get("/api/admin/contacts"),
          api.get("/api/admin/partners"),
          api.get("/api/admin/bookings"),
          api.get("/api/admin/appointments"),
          api.get("/api/admin/services"),
          api.get("/api/admin/careers"),
        ]);

        setData({
          users: users.data,
          contacts: contacts.data,
          partners: partners.data,
          bookings: bookings.data,
          appointments: appointments.data,
          services: services.data,
          careers: careers.data,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Failed to fetch data. Please check your connection and try again."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const sections = [
    { id: "Home", label: "Home" },
    { id: "users", label: "Users", count: data.users.length },
    {
      id: "contacts",
      label: "Contact Submissions",
      count: data.contacts.length,
    },
    { id: "partners", label: "Partners", count: data.partners.length },
    { id: "bookings", label: "Bookings", count: data.bookings.length },
    {
      id: "appointments",
      label: "Appointments",
      count: data.appointments.length,
    },
    { id: "services", label: "Services", count: data.services.length },
    { id: "careers", label: "Career Applications", count: data.careers.length },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar - Hidden on mobile unless menu is open */}
        <div
          className={`fixed lg:static inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:transform-none ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={`relative h-full bg-white border-r border-slate-200 transition-all duration-300 ${
              isSidebarOpen ? "w-64" : "w-20"
            }`}
          >
            <div className="p-4 flex items-center justify-between">
              <h2
                className={`font-bold text-slate-800 ${
                  !isSidebarOpen && "hidden"
                }`}
              >
                Dashboard
              </h2>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 hidden lg:block"
              >
                {isSidebarOpen ? (
                  <svg
                    className="w-6 h-6 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </div>
            <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-50 transition-colors duration-150 ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-500"
                      : "text-slate-600"
                  }`}
                >
                  <span className="flex-shrink-0">
                    {section.id === "Home" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}
                    {section.id === "users" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}
                    {section.id === "contacts" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {section.id === "partners" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {section.id === "bookings" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {section.id === "appointments" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {section.id === "services" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {section.id === "careers" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </span>
                  {isSidebarOpen && (
                    <span className="flex-1 text-left">
                      {section.label}
                      <span className="ml-2 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {section.count}
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Bar */}

            {activeSection === "Home" && (
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">Total Users</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {data.users.length}
                        </h3>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">Total Bookings</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {data.bookings.length}
                        </h3>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        This Month
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">Active Services</p>
                        <h3 className="text-3xl font-bold mt-2">
                          {data.services.filter((s) => s.isAvailable).length}
                        </h3>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">
                          Pending Applications
                        </p>
                        <h3 className="text-3xl font-bold mt-2">
                          {
                            data.careers.filter(
                              (c) => c.status === "Under Review"
                            ).length
                          }
                        </h3>
                      </div>
                      <div className="bg-white/20 p-3 rounded-lg">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        Under Review
                      </span>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bookings Trend Chart */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Bookings Trend
                    </h3>
                    <div className="h-80">
                      <Line
                        data={{
                          labels: data.bookings
                            .map((booking) =>
                              new Date(booking.bookingDate).toLocaleDateString()
                            )
                            .filter(
                              (date, index, self) =>
                                self.indexOf(date) === index
                            )
                            .slice(-6),
                          datasets: [
                            {
                              label: "Bookings",
                              data: data.bookings
                                .map((booking) =>
                                  new Date(
                                    booking.bookingDate
                                  ).toLocaleDateString()
                                )
                                .reduce(
                                  (acc: { [key: string]: number }, date) => {
                                    acc[date] = (acc[date] || 0) + 1;
                                    return acc;
                                  },
                                  {}
                                ),
                              borderColor: "rgb(59, 130, 246)",
                              backgroundColor: "rgba(59, 130, 246, 0.5)",
                              tension: 0.4,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "top",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Service Categories Distribution */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Service Categories
                    </h3>
                    <div className="h-80">
                      <Doughnut
                        data={{
                          labels: [
                            ...new Set(
                              data.services.map((service) => service.category)
                            ),
                          ],
                          datasets: [
                            {
                              data: [
                                ...new Set(
                                  data.services.map(
                                    (service) => service.category
                                  )
                                ),
                              ].map(
                                (category) =>
                                  data.services.filter(
                                    (service) => service.category === category
                                  ).length
                              ),
                              backgroundColor: [
                                "rgba(59, 130, 246, 0.8)",
                                "rgba(139, 92, 246, 0.8)",
                                "rgba(16, 185, 129, 0.8)",
                                "rgba(245, 158, 11, 0.8)",
                              ],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: "right",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recent Activity and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {data.bookings
                        .sort(
                          (a, b) =>
                            new Date(b.bookingDate).getTime() -
                            new Date(a.bookingDate).getTime()
                        )
                        .slice(0, 5)
                        .map((booking) => (
                          <div
                            key={booking._id}
                            className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-800">
                                {booking.serviceName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(
                                  booking.bookingDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span>Add New Service</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Schedule Appointment</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <span>View Reports</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                        <span>Send Notifications</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "users" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-slate-700">
                    Users (
                    {
                      getProcessedData(
                        (
                          data.users as unknown as Record<string, unknown>[]
                        ).filter(
                          (u): u is BaseRecord =>
                            typeof u === "object" && u !== null && "_id" in u
                        )
                      ).length
                    }
                    )
                  </h2>
                  <div className="flex gap-2">
                    <select
                      onChange={(e) => handleFilter("role", e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <button
                      onClick={() => handleBulkAction("export")}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Export
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRows(
                                  data.users.map((user) => user._id)
                                );
                              } else {
                                setSelectedRows([]);
                              }
                            }}
                            className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                          />
                        </th>
                        <th
                          className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                          onClick={() => handleSort("name")}
                        >
                          Name{" "}
                          {sortConfig.key === "name" && (
                            <span>
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th
                          className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                          onClick={() => handleSort("email")}
                        >
                          Email{" "}
                          {sortConfig.key === "email" && (
                            <span>
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th
                          className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                          onClick={() => handleSort("role")}
                        >
                          Role{" "}
                          {sortConfig.key === "role" && (
                            <span>
                              {sortConfig.direction === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {getProcessedData(
                        (
                          data.users as unknown as Record<string, unknown>[]
                        ).filter(
                          (u): u is BaseRecord =>
                            typeof u === "object" && u !== null && "_id" in u
                        )
                      ).map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(user._id)}
                              onChange={() => handleRowSelect(user._id)}
                              className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {String(user.name)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {String(user.email)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {String(user.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                setSelectedDetail({
                                  data: user,
                                  type: "user",
                                })
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "contacts" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Contact Submissions ({data.contacts.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Inquiry Type
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {getProcessedData(
                        (
                          data.contacts as unknown as Record<string, unknown>[]
                        ).filter(
                          (c): c is BaseRecord =>
                            typeof c === "object" && c !== null && "_id" in c
                        )
                      ).map((contact) => (
                        <tr
                          key={contact._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {String(contact.name)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {String(contact.email)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {String(contact.inquiryType)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                contact.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : contact.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {String(contact.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() =>
                                setSelectedDetail({
                                  data: contact,
                                  type: "contact",
                                })
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "partners" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Partners ({data.partners.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {data.partners.map((partner) => (
                        <tr
                          key={partner._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {partner.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {partner.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                partner.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : partner.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {partner.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "bookings" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Bookings ({data.bookings.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Payment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {data.bookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {booking.serviceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.paymentStatus === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : booking.paymentStatus === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "appointments" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Appointments ({data.appointments.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {data.appointments.map((appointment) => (
                        <tr
                          key={appointment._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {appointment.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {appointment.service.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {new Date(appointment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "services" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Services ({data.services.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {data.services.map((service) => (
                        <tr
                          key={service._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {service.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {service.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            ${service.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                service.isAvailable
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {service.isAvailable
                                ? "Available"
                                : "Unavailable"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "careers" && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                  Career Applications ({data.careers.length})
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {data.careers.map((career) => (
                        <tr
                          key={career._id}
                          className="hover:bg-slate-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-slate-700">
                            {career.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                            {career.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                career.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : career.status === "Accepted"
                                  ? "bg-green-100 text-green-800"
                                  : career.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {career.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Detail View Modal */}
      {selectedDetail && (
        <DetailView
          data={selectedDetail.data}
          type={selectedDetail.type}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
