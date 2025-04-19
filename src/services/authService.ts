import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      createdAt: string;
    };
  };
}

export interface AuthError {
  message: string;
  status: number;
}

const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/login", data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/register", data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  },

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get user data."
      );
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/profile";
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;
