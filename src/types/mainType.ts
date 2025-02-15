export interface IdeaMarketCheck {
  success: true;
  code: 'string';
  message: 'string';
  data: {
    content: [
      {
        ideaId: 0;
        auth: 'string';
        writerImageUrl: 'string';
        writerName: 'string';
        thumbnailImageUrl: 'string';
        title: 'string';
        price: 0;
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
