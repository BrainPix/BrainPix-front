import styles from './postRecord.module.scss';

interface Record {
  [key: string]: string | number | undefined;
}

interface PostRecordProps {
  records: Record[];
  title: string; // 레코드 제목
  columns: { key: string; label: string }[]; // 레코드 컬럼명
  actions?: { label: string; onClick: (record: Record) => void }[]; // 버튼 필요 시 추가
}

export const PostRecord = ({
  records = [],
  title,
  columns = [],
  actions,
}: PostRecordProps) => {
  //console.log(records);
  return (
    <div className={styles.recordWrapper}>
      {/* 레코드 제목 */}
      <div className={styles.recordTitle}>{title}</div>
      {/* 레코드 컬럼명 */}
      {columns.length > 0 ? (
        <div className={styles.recordHeader}>
          {columns.map((col) => (
            <div
              key={col.key}
              className={styles.recordDetail}>
              {col.label}
            </div>
          ))}
        </div>
      ) : null}
      {actions !== undefined ? (
        <span className={styles.recordHeader}></span>
      ) : null}
      {/* 레코드 값을 컬럼에 맞게 출력 */}
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
          {actions && (
            <div className={styles.recordDetail}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={styles.recordActions}
                  onClick={() => action.onClick(record)}>
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
