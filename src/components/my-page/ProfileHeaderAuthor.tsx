import { useNavigate } from 'react-router-dom';
import styles from './profileHeaderAuthor.module.scss';

interface ProfileHeaderAuthorProps {
  name: string;
  profileImageUrl: string;
  buttonPath: string;
}

export const ProfileHeaderAuthor = ({
  name,
  profileImageUrl,
  buttonPath,
}: ProfileHeaderAuthorProps) => {
  const navigate = useNavigate();
  const editPost = () => {
    navigate(`${buttonPath}/register`); // 수정하기 : 등록 페이지로 이동
  };
  const deletePost = () => {
    console.log('게시글 삭제'); // 삭제하기 : 삭제 API 호출
  };

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
            onClick={deletePost}>
            삭제하기
          </span>
        </div>
      </div>
    </>
  );
};
