export interface RequestAssignCheck {
  success: true;
  code: 'string';
  message: 'string';
  data: {
    content: [
      {
        taskId: 0;
        auth: 'ALL' | 'COMPANY' | 'ME';
        writerImageUrl: 'string';
        writerName: 'string';
        thumbnailImageUrl: 'string';
        title: 'string';
        deadline: 0;
        category: 'string';
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
