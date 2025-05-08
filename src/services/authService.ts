import api from "./api";

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  message?: string;
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
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Email verification failed. Please try again."
      );
    }
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Password reset request failed. Please try again."
      );
    }
  },

  async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
    try {
      const response = await api.post(`/auth/reset-password/${data.token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    }
  },

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch user data. Please try again."
      );
    }
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe");
    window.location.href = "/";
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isRemembered(): boolean {
    return localStorage.getItem("rememberMe") === "true";
  },
};

export default authService;
