export interface RequestAssignRegister {
  title: 'string';
  content: 'string';
  specialization: 'ADVERTISING_PROMOTION';
  openMyProfile: true;
  imageList: ['string'];
  attachmentFileList: ['string'];
  postAuth: 'ALL';
  recruitments: [
    {
      domain: 'string';
      requestTaskPriceDto: {
        price: 1;
        totalQuantity: 1;
        paymentDuration: 'ONCE';
      };
    },
  ];
  deadline: '2025-02-10 14:30';
  requestTaskType: 'OPEN_IDEA';
}
