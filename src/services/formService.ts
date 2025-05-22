import api from "./api";
import bookingService from "./bookingService";

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
    const response = await api.post("/appointments", data);

    // If user is logged in, create a booking
    if (data.userId) {
      try {
        // Create a booking for the appointment
        const appointmentService = {
          _id: `appointment-${Date.now()}`,
          name: "Appointment Booking",
          description: `Appointment booked for ${data.service.title} on ${data.date} at ${data.time}`,
          price: parseFloat(data.service.price) || 0,
          type: "appointment",
        };
        await bookingService.createBooking(
          appointmentService._id,
          new Date().toISOString(),
          appointmentService.description
        );
      } catch (error) {
        console.error("Failed to create appointment booking:", error);
      }
    }

    return response.data;
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
      if (data.userId) {
        try {
          // Create a booking for the contact form submission
          const contactService = {
            _id: "contact-form-service", // Use a fixed ID for contact form service
            name: "Contact Form Submission",
            description: `Contact form submission from ${data.name}${
              data.companyName ? ` - ${data.companyName}` : ""
            }`,
            price: 0,
            type: "contact",
          };
          await bookingService.createBooking(
            contactService._id,
            new Date().toISOString(),
            contactService.description
          );
        } catch (error) {
          console.error("Failed to create contact form booking:", error);
          // Don't throw the error since the contact form was submitted successfully
        }
      }

      return response.data;
    } catch (error) {
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
    const response = await api.post("/partners", data);

    // If user is logged in, create a booking
    if (data.userId) {
      try {
        // Create a booking for the partner application
        const partnerService = {
          _id: `partner-${Date.now()}`,
          name: "Partner Application",
          description: `Partner application from ${data.name}${
            data.company ? ` - ${data.company}` : ""
          }`,
          price: 0,
          type: "partner",
        };
        await bookingService.createBooking(
          partnerService._id,
          new Date().toISOString(),
          partnerService.description
        );
      } catch (error) {
        console.error("Failed to create partner application booking:", error);
      }
    }

    return response.data;
  },

  // Career Applications
  async submitCareerApplication(data: CareerFormData) {
    const response = await api.post("/careers", data);

    // If user is logged in, create a booking
    if (data.userId) {
      try {
        // Create a booking for the career application
        const careerService = {
          _id: `career-${Date.now()}`,
          name: "Career Application",
          description: `Career application from ${data.name}${
            data.position ? ` for ${data.position}` : ""
          }`,
          price: 0,
          type: "career",
        };
        await bookingService.createBooking(
          careerService._id,
          new Date().toISOString(),
          careerService.description
        );
      } catch (error) {
        console.error("Failed to create career application booking:", error);
      }
    }

    return response.data;
  },
};

export default formService;
