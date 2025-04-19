import api from "./api";

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "Security Audit"
    | "Consultation"
    | "Training"
    | "Implementation"
    | "Other";
  image?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceResponse {
  status: string;
  data: {
    service: Service;
  };
}

export interface ServicesResponse {
  status: string;
  data: {
    services: Service[];
  };
}

const serviceService = {
  async getServices(): Promise<ServicesResponse> {
    const response = await api.get("/services");
    return response.data;
  },

  async getService(id: string): Promise<ServiceResponse> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  async createService(
    serviceData: Omit<Service, "_id" | "createdAt" | "updatedAt">
  ): Promise<ServiceResponse> {
    const response = await api.post("/services", serviceData);
    return response.data;
  },

  async updateService(
    id: string,
    serviceData: Partial<Service>
  ): Promise<ServiceResponse> {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  async deleteService(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  },
};

export default serviceService;
