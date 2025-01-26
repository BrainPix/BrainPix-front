import styles from './postRecord.module.scss';

interface Record {
  id: string; // 아이디
  role: string; // 역할
  current: number; // 현재 인원
  total?: number; // 모집 인원
}

interface PostRecordProps {
  records: Record[];
  title: string; // 게시물 제목
}

function PostRecord({ records, title }: PostRecordProps) {
  return (
    <div className={styles.recordWrapper}>
      <div className={styles.recordTitle}>{title}</div>
      {records.map((record) => (
        <div
          key={record.id}
          className={styles.recordRow}>
          <div className={styles.recordDetail}>{record.id}</div>
          <div className={styles.recordDetail}>{record.role}</div>
          <div className={styles.recordDetail}>
            {record.total !== undefined
              ? `${record.current} 명 / ${record.total} 명`
              : `${record.current} 명`}
          </div>
          <div className={styles.recordDetail}>
            <button className={styles.messageButton}>수락</button>
            <button className={styles.messageButton}>거절</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostRecord;
