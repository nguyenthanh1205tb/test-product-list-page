import { random } from 'src/helpers';
import { Kind, Status } from 'src/types';

const productsName = [
  'Kính iPhone 14 Pro Max',
  'Ron viền iPhone 14 Pro Max',
  'Keo OCA iPhone 14 Pro Max',
  'Màn hình Samsung Galaxy A52',
  'Kính Samsung Galaxy Note 9',
  'OCA Samsung Galaxy Note 9',
  'Kính lưng Samsung Galaxy Note 9',
  'Bộ cáp main Samsung Galaxy Z Fold 3',
  'Màn hình Apple Watch Series 6',
];
const prices = [70000, 1129051, 20015, 105810, 18051802];
const techName = ['Khoa', 'Bình', 'Thanh', 'Lam'];
const colsName = [
  'Mã phiếu', // 0
  'Tên khách hàng',
  'Số điện thoại',
  'Tên sản phẩm', // 3
  'Mã phiếu dịch vụ', // 4
  'Trạng thái', // 5
  'Giá', // 6
  'Loại', // 7
  'Kho', // 8
  'SL đơn hàng',
  'Ngày tạo',
  'Địa chỉ',
  'Kỹ thuật', // 12
  'Ngày cuối mua hàng',
  'SL phiếu sửa chữa',
];

export const STATUS_OPTIONS = [
  {
    label: 'Đang giao dịch',
    value: 0,
  },
  {
    label: 'Ngừng giao dịch',
    value: 1,
  },
];
export const TAG_OPTIONS = [
  'iPhone 14 Pro Max',
  'iPhone 14 Pro Series',
  'iPhone 11 Pro Series',
  'ipad Pro M1',
];
export const LIST_FILTER_SAVED = [
  'Lọc theo trạng thái',
  'Lọc theo ngày hôm nay',
  'Lọc theo tag iphone',
  'Lọc theo người tạo',
];

export const listColsName = colsName.map((n, i) => ({ label: n, value: i }));
export const randomKind = (): Kind => {
  const list = [Kind.COMPONENTS_NEEDED, Kind.RISK_ARISE];
  const randomNum = random(0, 1);
  return list[randomNum] as Kind;
};
export const randomStatus = (): Status => {
  const list = [
    Status.CANCEL,
    Status.CONFIRMED,
    Status.PENDING_CONFIRM,
    Status.RELEASED,
    Status.REQUEST,
    Status.RESTORE,
  ];
  const randomNum = random(0, list.length - 1);
  return list[randomNum] as Status;
};
export const randomProductName = (): string => {
  const randomNum = random(0, productsName.length - 1);
  return productsName[randomNum];
};
export const randomPrice = (): string => {
  const randomNum = random(0, prices.length - 1);
  return `${prices[randomNum]}`;
};
export const randomTechName = (): string => {
  const randomNum = random(0, techName.length - 1);
  return techName[randomNum];
};
