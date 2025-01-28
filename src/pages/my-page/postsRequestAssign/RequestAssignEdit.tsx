import styles from './requestAssignEdit.module.scss';

export const RequestAssignEdit = () => {
  const USER_DATA = {
    userName: 'SY TECH',
    profileImage: null,
  };
  const POST_DATA = {
    tab: '요청과제',
    category: '디자인',
    mainImage: null,
    title: 'Web 서비스 제안',
    date: '2024/12/28',
    viewCount: 120,
    saveCount: 12,
    deadline: 21,
    description: '과제 설명입니다...',
  };
  const ATTACHMENT = {
    fileName: '첨부파일입니다...pdf',
    fileUrl: '#',
  };
  const RECRUIT_INFO = [
    { role: '디자이너', current: 1, total: 4, payment: '100,000원 (건당)' },
    { role: '프론트엔드', current: 1, total: 4, payment: '추후 협의' },
  ];
  return (
    <div>
      {/* 게시글 작성자의 이미지, 단체명, 수정&삭제 버튼 */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.companyImage}>
            {USER_DATA.profileImage ? (
              <img
                className={styles.companyImage}
                src={USER_DATA.profileImage}
                alt='프로필 사진'
              />
            ) : (
              <div className={styles.companyImage} />
            )}
          </div>
          <div className={styles.companyName}>{USER_DATA.userName}</div>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionButton}>수정하기</button>
          <div className={styles.buttonDivider}></div>
          <button className={styles.actionButton}>삭제하기</button>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className={styles.imageAndDetails}>
        <div className={styles.imageWrapper}>
          {POST_DATA.mainImage ? (
            <img
              className={styles.mainImage}
              src={POST_DATA.mainImage}
              alt='대표사진'
            />
          ) : (
            <div className={styles.mainImage}>대표사진</div>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {POST_DATA.tab} {'>'} {POST_DATA.category}
          </div>
          <div className={styles.deadline}>
            모집 마감 (D-{POST_DATA.deadline})
          </div>
          <p className={styles.title}>{POST_DATA.title}</p>
          <p className={styles.date}>
            {POST_DATA.date} · 조회 {POST_DATA.viewCount} · 저장{' '}
            {POST_DATA.saveCount}
          </p>
          <button className={styles.applyButton}>지원하기</button>
        </div>
      </div>
      {/* 과제 설명 */}
      <div className={styles.description}>
        <h3>과제 설명</h3>
        <p>{POST_DATA.description}</p>
      </div>

      {/* 첨부파일 */}
      <div className={styles.attachments}>
        <h3>첨부파일</h3>
        <div className={styles.attachmentItem}>
          <a
            href={ATTACHMENT.fileUrl}
            target='_blank'
            rel='noopener noreferrer'>
            {ATTACHMENT.fileName}
          </a>
          <div className={styles.attachmentActions}>
            <button className={styles.attachmentButton}>열기</button>
            <button className={styles.attachmentButton}>다운로드</button>
          </div>
        </div>
      </div>
    </div>
  );
};
