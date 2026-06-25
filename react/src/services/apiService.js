import api from "./api";

export default class ApiService {
  // Centralized request wrapper to handle responses and errors consistently
  static async handleRequest(request) {
    try {
      const response = await request;
      return response.data || response;
    } catch (error) {
      console.error("API Error:", error);
      return {
        error: true,
        message: error.response?.data?.message || "Something went wrong",
        status: error.response?.status,
      };
    }
  }
  static async getCSRFcookie() {
    await api.get("/sanctum/csrf-cookie");
    return null;
  }
  static async signup(userData) {
    return this.handleRequest(api.post("/api/signup", userData));
  }

  static async login(credentials) {
    return this.handleRequest(api.post("/api/login", credentials));
  }

  static async logout() {
    return this.handleRequest(api.post("/api/logout"));
  }

  static async getCurrentUser() {
    return this.handleRequest(api.get("/api/user"));
  }

  static async getExpenses(page = 1) {
    return this.handleRequest(api.get(`/api/expenses?page=${page}`));
  }
  static async createExpense(expense_form) {
    return this.handleRequest(api.post("/api/expenses", expense_form));
  }
  static async updateExpense(expense_form, expense_id) {
    return this.handleRequest(
      api.put(`/api/expenses/${expense_id}`, expense_form),
    );
  }
  static async deleteExpense(expense_id) {
    return this.handleRequest(api.delete(`/api/expenses/${expense_id}`));
  }
  static async getTotalExpense(params) {
    return this.handleRequest(
      api.get("/api/expenses/totals", {
        params,
      }),
    );
  }
  static async getExpenseCategories() {
    return this.handleRequest(api.get("/api/expense_categories"));
  }
}
