import styles from './postFormAuthor.module.scss';

interface PostFormAuthorProps {
  userName: string;
  profileImage?: string | null;
}

export const PostFormAuthor = ({
  userName,
  profileImage,
}: PostFormAuthorProps) => {
  return (
    <div>
      {/* 게시글 작성자의 이미지, 단체명, 수정&삭제 버튼 */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.companyImage}>
            {profileImage ? (
              <img
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
          <button className={styles.actionButton}>수정하기</button>
          <div className={styles.buttonDivider}></div>
          <button className={styles.actionButton}>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
