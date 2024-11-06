export interface AdminDashboardState {
  statistics: {
    data: any; // Thay thế `any` bằng model cụ thể nếu có
    isLoading: boolean;
  };
  topCoursesIncome: {
    data: any; // Thay thế `any` bằng model cụ thể nếu có
    isLoading: boolean;
  };
  paidUsersStatistics: {
    data: any;
    isLoading: boolean;
  };
}

export const initialAdminDashboardState: AdminDashboardState = {
  statistics: {
    data: null,
    isLoading: false,
  },
  topCoursesIncome: {
    data: [],
    isLoading: false,
  },
  paidUsersStatistics: {
    data: [],
    isLoading: false,
  },
};
