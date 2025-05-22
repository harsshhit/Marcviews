import api from "./api";

// Appointment Types
export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
  service: {
    _id: string;
    title: string;
    duration: string;
    price: string;
  };
  userId?: string; // Add user ID for logged-in users
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  companyName?: string;
  companySize?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  companyWebsite?: string;
  address?: string;
  country?: string;
  inquiry: string;
  inquiryType?: "general" | "sales" | "support" | "partnership" | "other";
  budget?:
    | "<$5,000"
    | "$5,000-$10,000"
    | "$10,000-$25,000"
    | "$25,000-$50,000"
    | "$50,000+";
  timeframe?:
    | "immediate"
    | "1-3 months"
    | "3-6 months"
    | "6-12 months"
    | "12+ months";
  howDidYouHear?: string;
  signUpForUpdates: boolean;
  userId?: string; // Add user ID for logged-in users
}

// Partner Types
export interface PartnerFormData {
  name: string;
  email: string;
  company?: string;
  servicesInterested: string;
  userId?: string; // Add user ID for logged-in users
}

// Career Types
export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  position?: string;
  resumeUrl?: string;
  userId?: string; // Add user ID for logged-in users
}

const formService = {
  // Appointment Submissions
  async submitAppointment(data: AppointmentFormData) {
    try {
      // Create a clean copy of the data to send to the API
      const submissionData = { ...data };

      // If userId is not provided (user not logged in), remove it to avoid backend validation issues
      if (!submissionData.userId) {
        delete submissionData.userId;
      }

      // Log the data being sent to help with debugging
      console.log("Submitting appointment data:", submissionData);

      const response = await api.post("/appointments", submissionData);

      // Note: We're skipping the booking creation for now as it requires a valid service ID
      // This will be handled separately or through a different mechanism
      // The appointment submission itself is successful without this booking

      return response.data;
    } catch (error: any) {
      console.error("Appointment submission error:", error);

      // Improved error handling to extract more specific error messages
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message ||
                          (error.response.data.error ? error.response.data.error :
                          "Server error. Please try again.");

        // Create a new error with the extracted message
        const enhancedError = new Error(errorMessage);
        throw enhancedError;
      }

      throw error;
    }
  },

  // Contact Form Submissions
  async submitContact(data: ContactFormData) {
    try {
      // Create a clean copy of the data to send to the API
      const submissionData = { ...data };

      // If userId is not provided (user not logged in), remove it to avoid backend validation issues
      if (!submissionData.userId) {
        delete submissionData.userId;
      }

      // Log the data being sent to help with debugging
      console.log("Submitting contact form data:", submissionData);

      const response = await api.post("/contacts", submissionData);

      // If user is logged in, create a booking
      // Note: We're skipping the booking creation for now as it requires a valid service ID
      // This will be handled separately or through a different mechanism
      // The contact form submission itself is successful without this booking

      return response.data;
    } catch (error: any) {
      console.error("Contact submission error:", error);

      // Improved error handling to extract more specific error messages
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message ||
                            (error.response.data.error ? error.response.data.error :
                            "Server error. Please try again.");

        // Create a new error with the extracted message
        const enhancedError = new Error(errorMessage);
        throw enhancedError;
      }

      throw error;
    }
  },

  // Partner Applications
  async submitPartnerApplication(data: PartnerFormData) {
    try {
      // Create a clean copy of the data to send to the API
      const submissionData = { ...data };

      // If userId is not provided (user not logged in), remove it to avoid backend validation issues
      if (!submissionData.userId) {
        delete submissionData.userId;
      }

      // Log the data being sent to help with debugging
      console.log("Submitting partner application data:", submissionData);

      const response = await api.post("/partners", submissionData);

      // Note: We're skipping the booking creation for now as it requires a valid service ID
      // This will be handled separately or through a different mechanism
      // The partner application submission itself is successful without this booking

      return response.data;
    } catch (error: any) {
      console.error("Partner application submission error:", error);

      // Improved error handling to extract more specific error messages
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message ||
                          (error.response.data.error ? error.response.data.error :
                          "Server error. Please try again.");

        // Create a new error with the extracted message
        const enhancedError = new Error(errorMessage);
        throw enhancedError;
      }

      throw error;
    }
  },

  // Career Applications
  async submitCareerApplication(data: CareerFormData) {
    try {
      // Create a clean copy of the data to send to the API
      const submissionData = { ...data };

      // If userId is not provided (user not logged in), remove it to avoid backend validation issues
      if (!submissionData.userId) {
        delete submissionData.userId;
      }

      // Log the data being sent to help with debugging
      console.log("Submitting career application data:", submissionData);

      const response = await api.post("/careers", submissionData);

      // Note: We're skipping the booking creation for now as it requires a valid service ID
      // This will be handled separately or through a different mechanism
      // The career application submission itself is successful without this booking

      return response.data;
    } catch (error: any) {
      console.error("Career application submission error:", error);

      // Improved error handling to extract more specific error messages
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message ||
                          (error.response.data.error ? error.response.data.error :
                          "Server error. Please try again.");

        // Create a new error with the extracted message
        const enhancedError = new Error(errorMessage);
        throw enhancedError;
      }

      throw error;
    }
  },
};

export default formService;
