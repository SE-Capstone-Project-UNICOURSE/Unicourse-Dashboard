import type { DataResponse } from '@app/stores/models';
import httpClient from '@app/utils/httpClient';
import type { AxiosRequestConfig } from 'axios';
import type { StatisticsData } from '../models/StatisticSeriesModel';
import type { CourseData } from '../models/CourseDataModel';
import type { UserWillingData } from '../models/UserWillingDataModel';
import { DASHBOARD_ADMIN_API_PATH } from '../../constants';

class AdminDashboardService {
  // API lấy dữ liệu thống kê
  public async getStatistics(accessToken: string): Promise<DataResponse<StatisticsData>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<StatisticsData>>(
      `${DASHBOARD_ADMIN_API_PATH.GET_STATISTICS}`,
      config
    );

    return response.data;
  }

  // API lấy top 10 khóa học
  public async getTopCourses(accessToken: string): Promise<DataResponse<CourseData[]>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<CourseData[]>>(
      `${DASHBOARD_ADMIN_API_PATH.GET_TOP_COURSES_INCOME}`,
      config
    );

    return response.data;
  }

  // API lấy danh sách người dùng tự nguyện
  public async getWillingUsers(accessToken: string): Promise<DataResponse<UserWillingData>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await httpClient.get<DataResponse<UserWillingData>>(
      `${DASHBOARD_ADMIN_API_PATH.GET_PAID_USERS_STATISTICS}`,
      config
    );

    return response.data;
  }
}

export default new AdminDashboardService();
