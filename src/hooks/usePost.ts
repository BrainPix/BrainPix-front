import { useParams } from 'react-router-dom';

const mockPosts = [
  {
    id: '1',
    authorId: 'user1',
    title: '디자인 해드립니다',
    price: 200000000,
    purchaseRecords: [
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
    ],
  },
  // 추가 데이터...
];

export const usePost = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = mockPosts.find((p) => p.id === postId);

  return post;
};
