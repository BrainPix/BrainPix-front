import styles from './applyCollaboration.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { ApplyDetailsInfo } from '../../../components/my-page/apply/ApplyDetailsInfo';
import { ApplyTable } from '../../../components/my-page/apply/ApplyTable';

export const ApplyCollaboration = () => {
  const FORM_DATA = {
    cardTitle: '협업 광장 지원 상세',
    labelText: '기업',
    labelType: 'corporate',
  };
  const APPLY_DATA = [
    {
      id: 1,
      status: '수락됨',
      statusType: 'accept',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '협업 광장',
      category: '디자인',
      itemName: '앱 개발 팀원 모집',
      part: '디자이너',
    },
    {
      id: 2,
      status: '거절됨',
      statusType: 'reject',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '협업 광장',
      category: '디자인',
      itemName: '앱 개발 팀원 모집',
      part: '디자이너',
    },
  ];
  const TABLE_DATA = [
    {
      id: 'qweqr',
      role: '디자이너',
      current: 1,
      total: 2,
    },
    {
      id: 'qweqr',
      role: '디자이너',
      current: 1,
      total: 2,
    },
  ];

  const acceptedApplications = APPLY_DATA.filter(apply => apply.statusType === 'accept');
  const rejectedApplications = APPLY_DATA.filter(apply => apply.statusType === 'reject');

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>지원 내역</span>
      </div>

      {acceptedApplications.map((apply) => (
        <div key={apply.id} className={styles.applyCard}>
          <div className={styles.cardHeaderContainer}>
            <CardHeader
              date={apply.date}
              status={apply.status}
              statusType={apply.statusType}
              cardTitle={FORM_DATA.cardTitle}
            />
          </div>

          <PostAuthorInfo seller={apply.seller} labelText={FORM_DATA.labelText} labelType={FORM_DATA.labelType}/>

          <ApplyDetailsInfo
            tab={apply.tab}
            category={apply.category}
            itemName={apply.itemName}
            part={apply.part}
          />
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <span>아이디</span>
              <span className={styles.divider} />
              <span>역할</span>
              <span className={styles.divider} />
              <span>인원수</span>
              <span className={styles.divider} />
              <span></span>
            </div>
            {TABLE_DATA.map((data) => (
              <ApplyTable id={data.id} role={data.role} current={data.current} total={data.total} />
            ))}
          </div>
        </div>
      ))}

      {rejectedApplications.map((apply) => (
        <div key={apply.id} className={styles.applyCard}>
          <div className={styles.cardHeaderContainer}>
            <CardHeader
              date={apply.date}
              status={apply.status}
              statusType={apply.statusType}
              showDeleteButton={true}
            />
          </div>

          <ApplyDetailsInfo
            tab={apply.tab}
            category={apply.category}
            itemName={apply.itemName}
            part={apply.part}
          />
        </div>
      ))}
    </div>
  );
};