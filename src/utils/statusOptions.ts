export const statusOptions: { [key: number]: string } = {
  0: 'TO_BE_PAID',
  1: 'PENDING',
  2: 'AUDITED',
  3: 'CANCEL',
  4: 'COMPLETED',
};

// Order Audit Status
export const OrderStatus = { 
  TO_BE_PAID: 0,
  PENDING: 1,
  AUDITED: 2,
  CANCEL: 3,
  COMPLETED: 4
}

export const TransferStatus = {
  TO_BE_TRANSFERED: 0,
  TRANSFERED: 1,
}

export const tabs = [
  { id: 0, title: '全部', orderStatus: null, transferStatus: null },
  { id: 1, title: '待支付', orderStatus: OrderStatus.TO_BE_PAID, transferStatus:  TransferStatus.TO_BE_TRANSFERED},
  { id: 2, title: '待审核', orderStatus: OrderStatus.PENDING, transferStatus: TransferStatus.TO_BE_TRANSFERED },
  { id: 3, title: '已完成', orderStatus: OrderStatus.AUDITED, transferStatus: TransferStatus.TRANSFERED },
  { id: 4, title: '审核失败', orderStatus: OrderStatus.CANCEL, transferStatus: TransferStatus.TO_BE_TRANSFERED },
];
