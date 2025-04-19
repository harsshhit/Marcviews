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
  industry?: string;
  companyName: string;
  companyWebsite?: string;
  address?: string;
  inquiry: string;
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
    const response = await api.post("/contacts", data);

    // If user is logged in, create a booking
    if (data.userId) {
      try {
        // Create a booking for the contact form submission
        const contactService = {
          _id: `contact-${Date.now()}`,
          name: "Contact Form Submission",
          description: `Contact form submission from ${data.name} - ${data.companyName}`,
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
      }
    }

    return response.data;
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
