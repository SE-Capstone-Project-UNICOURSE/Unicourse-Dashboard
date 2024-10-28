/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
// src/common/utils/HelperService.ts

import { COMMON_CONSTANTS } from "@app/common/constants/appConstants";

class helpers {
  // Method to format a Date object to a string
  public formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  // Method to format a date string to a more readable format (Vietnam locale)
  public formatDateToVN(dateString: string): string {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  }

  // Method to format a number to VND currency format
  public formatCurrencyVND(amount: number): string {
    return amount.toLocaleString('vi-VN');
  }

  public formatDuration = (totalMinutes: number) => {
    if (totalMinutes >= 1440) {
      // 1440 minutes = 1 day
      const days = Math.floor(totalMinutes / 1440);
      const remainingHours = Math.floor((totalMinutes % 1440) / 60);
      return `${days}d ${remainingHours}h`;
    }
    if (totalMinutes >= 60) {
      // 60 minutes = 1 hour
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${totalMinutes}m`;
  };

  public formatStatus(status: string, type?: string): string {
    switch (type) {
      case COMMON_CONSTANTS.COURSE:
        return this.formatStatusCourse(status);
      default:
        return this.formatStatusDefault(status);
    }
  }

  private formatStatusCourse(status: string): string {
    switch (status) {
      case COMMON_CONSTANTS.DRAFT:
        return 'Đang chờ duyệt';
      case COMMON_CONSTANTS.PUBLISHED:
        return 'Hoạt động';
      case COMMON_CONSTANTS.CLOSED:
        return 'Đã đóng';
      default:
        return 'Không xác định';
    }
  }

  private formatStatusDefault(status: string): string {
    switch (status) {
      case COMMON_CONSTANTS.DRAFT:
        return 'Nháp';
      case COMMON_CONSTANTS.PUBLISHED:
        return 'Đã xuất bản';
      case COMMON_CONSTANTS.CLOSED:
        return 'Đã đóng';
      default:
        return 'Không xác định';
    }
  }
}

export default new helpers();
