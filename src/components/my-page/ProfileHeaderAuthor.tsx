import { useNavigate } from 'react-router-dom';
import styles from './profileHeaderAuthor.module.scss';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIdeaMarketPost } from '../../apis/postEditDeleteAPI';

interface ProfileHeaderAuthorProps {
  name: string;
  profileImageUrl: string;
  buttonPath: string;
  postId: number;
}

export const ProfileHeaderAuthor = ({
  name,
  profileImageUrl,
  buttonPath,
  postId,
}: ProfileHeaderAuthorProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editPost = () => {
    navigate(`${buttonPath}/register`); // 수정하기 : 등록 페이지로 이동
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (isConfirmed) {
      deletePost.mutate();
    }
  };
  const deletePost = useMutation({
    mutationFn: () => deleteIdeaMarketPost(postId),
    onSuccess: () => {
      alert('해당 아이디어 마켓 게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['myPosts'] }); // 삭제 후 리스트 새로고침
      navigate('/my/posts'); // 삭제 후 마이페이지 - 게시물 관리 페이지로 이동
    },
    onError: () => {
      alert('게시글 삭제에 실패했습니다.');
    },
  });

  return (
    <>
      {/* 게시글 작성자의 프로필 헤더 */}
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <img
            src={profileImageUrl || '/default-profile.png'}
            alt='프로필 이미지'
            className={styles.profileIcon}
          />
          <span className={styles.name}>{name || '?'}</span>
        </div>
        <div className={styles.buttonContainer}>
          <span
            className={styles.button}
            onClick={editPost}>
            수정하기
          </span>
          <span className={styles.buttonDivider}></span>
          <span
            className={styles.button}
            onClick={handleDeleteClick}>
            삭제하기
          </span>
        </div>
      </div>
    </>
  );
};
