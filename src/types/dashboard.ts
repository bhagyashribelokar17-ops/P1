export interface DashboardResponse {
  success: boolean;
  user: {
    name: string;
    email: string;
    degree: string;
  };
}