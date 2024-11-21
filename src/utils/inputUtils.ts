import { UnitCurrency } from '@app/common/components/forms/components/InputField';

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  type: React.HTMLInputTypeAttribute
) => {
  if (type === 'number') {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter']; // Các phím được phép
    if (!allowedKeys.includes(event.key) && (event.key < '0' || event.key > '9')) {
      event.preventDefault(); // Chặn ký tự
    }
  }
};
const formatCurrency = (value: string | number, unit: UnitCurrency) => {
  if (unit === 'VND') {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0, // Không hiển thị phần lẻ
    });
    return formatter.format(Number(value) || 0);
  }
  if (unit === 'USD') {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(Number(value) || 0);
  }
  return value;
};
// Hàm xử lý khi dán
const handlePaste = (
  event: React.ClipboardEvent<HTMLDivElement>,
  type: React.HTMLInputTypeAttribute
) => {
  if (type === 'number') {
    const clipboardData = event.clipboardData.getData('Text');
    if (!/^\d+$/.test(clipboardData)) {
      // Nếu dữ liệu dán không phải số, ngăn dán
      event.preventDefault();
    }
  }
};

export { formatCurrency, handleKeyDown, handlePaste };
