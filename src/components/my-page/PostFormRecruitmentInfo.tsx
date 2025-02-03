import styles from './postFormRecruitmentInfo.module.scss';

export const PostFormRecruitmentInfo = () => {
  const RECRUIT_INFO = [
    {
      id: '1',
      role: '디자이너',
      current: 1,
      total: 4,
      payment: '100,000원 (건당)',
    },
    { id: '2', role: '프론트엔드', current: 1, total: 4, payment: '추후 협의' },
  ];
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 정보</h1>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.recruitTableHeader}>
        <span className={styles.headerValue}>모집 단위</span>
        <span className={styles.headerValue}>모집 인원</span>
        <span className={styles.headerValue}>보수 금액 (형태)</span>
      </div>
      {RECRUIT_INFO.map((group) => (
        <div
          key={group.id}
          className={styles.recruitRecord}>
          <div className={styles.recordValue}>{group.role}</div>
          <div className={styles.recordValue}>
            {group.current} / {group.total}
          </div>
          <div className={styles.recordValue}>{group.payment}</div>
        </div>
      ))}
    </div>
  );
};
