export interface CollaborationCheck {
  success: true;
  code: 'string';
  message: 'string';
  data: {
    content: [
      {
        collaborationId: 0;
        auth: 'ALL' | 'COMPANY' | 'ME';
        writerImageUrl: 'string';
        writerName: 'string';
        thumbnailImageUrl: 'string';
        title: 'string';
        deadline: 0;
        category: 'string';
        occupiedQuantity: 0;
        totalQuantity: 0;
        saveCount: 0;
        viewCount: 0;
        isSavedPost: true;
      },
    ];
    totalPages: 0;
    totalElements: 0;
    currentPage: 0;
    size: 0;
    hasNext: true;
  };
}
