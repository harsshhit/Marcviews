import api from "./api";

export interface Booking {
  _id: string;
  user: string;
  serviceId: string;
  serviceName: string;
  price: number;
  bookingDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  status: string;
  data: {
    booking: Booking;
  };
}

export interface BookingsResponse {
  status: string;
  data: {
    bookings: Booking[];
  };
}

const bookingService = {
  async getBookings(): Promise<BookingsResponse> {
    const response = await api.get("/bookings");
    return response.data;
  },

  async getBooking(id: string): Promise<BookingResponse> {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async createBooking(
    serviceId: string,
    bookingDate: string,
    notes?: string
  ): Promise<BookingResponse> {
    const response = await api.post("/bookings", {
      serviceId,
      bookingDate,
      notes,
    });
    return response.data;
  },

  async updateBookingStatus(
    id: string,
    status: Booking["status"]
  ): Promise<BookingResponse> {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  async cancelBooking(id: string): Promise<BookingResponse> {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export default bookingService;
