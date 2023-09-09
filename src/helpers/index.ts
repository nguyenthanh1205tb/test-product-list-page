import { Kind, Status } from 'src/types';

const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getStatusProperties = (name: string): { text: string; color: string } => {
  const response = (text: string, color: string) => ({ text, color });
  switch (name) {
    case Status.CONFIRMED:
      return response('Đã xác nhận', 'var(--success-color)');
    case Status.CANCEL:
      return response('Huỷ', 'var(--delete-color)');
    case Status.PENDING_CONFIRM:
      return response('Cần xác nhận', 'var(--disable-color)');
    case Status.RELEASED:
      return response('Đã xuất kho', 'var(--main-color)');
    case Status.REQUEST:
      return response('Yêu cầu', 'var(--warn-color)');
    case Status.RESTORE:
      return response('Trả lại', 'var(--delete-color)');
    default:
      return response('', '');
  }
};

const getKindProperties = (name: string): { text: string; color: string } => {
  const response = (text: string, color: string) => ({ text, color });
  switch (name) {
    case Kind.COMPONENTS_NEEDED:
      return response('Linh kiện cần', 'var(--ground-01)');
    case Kind.RISK_ARISE:
      return response('Rủi ro, phát sinh', 'var(--delete-color)');
    default:
      return response('', '');
  }
};

const numToPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'vnd',
});

export { getKindProperties, getStatusProperties, numToPrice, random };
