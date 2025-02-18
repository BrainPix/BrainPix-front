import { useNavigate } from 'react-router-dom';
import styles from './postFormAuthor.module.scss';
import { Image } from '../common/image/Image';

interface PostFormAuthorProps {
  userName: string;
  profileImage?: string | null;
  postId?: number;
  editPath?: string;
}

export const PostFormAuthor = ({
  userName,
  profileImage,
  postId,
  editPath,
}: PostFormAuthorProps) => {
  const navigate = useNavigate();

  const handleEditNavigate = () => {
    navigate(`${editPath}/${postId}`);
  };

  return (
    <div>
      {/* 게시글 작성자의 이미지, 단체명, 수정&삭제 버튼 */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.companyImage}>
            {profileImage ? (
              <Image
                className={styles.companyImage}
                src={profileImage}
                alt='프로필 사진'
              />
            ) : (
              <div className={styles.companyImage} />
            )}
          </div>
          <div className={styles.companyName}>{userName}</div>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={handleEditNavigate}>
            수정하기
          </button>
          <div className={styles.buttonDivider}></div>
          <button className={styles.actionButton}>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
