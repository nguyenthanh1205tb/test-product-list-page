export enum Status {
  REQUEST = 'request',
  RELEASED = 'released',
  PENDING_CONFIRM = 'pending_confirm',
  CONFIRMED = 'confirmed',
  CANCEL = 'cancel',
  RESTORE = 'restore',
}

export enum Kind {
  COMPONENTS_NEEDED = 'component_needed',
  RISK_ARISE = 'risk_arise',
}

interface TableDataType {
  key: React.Key;
  ticketCode: string;
  productName: string;
  price: string;
  warehouse: string;
  ticketCodeService: string;
  status: Status;
  kind: Kind;
  technician: string;
}

export type { TableDataType };
