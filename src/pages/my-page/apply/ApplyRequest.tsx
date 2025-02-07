import styles from './applyRequest.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { ApplyDetailsInfo } from '../../../components/my-page/apply/ApplyDetailsInfo';

export const ApplyRequest = () => {
  const FORM_DATA = {
    cardTitle: '요청 과제 지원 상세',
    labelText: '개인',
    labelType: 'personal',
  };
  const APPLY_DATA = [
    {
      id: 1,
      status: '수락됨',
      statusType: 'accept',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '요청 과제',
      category: '디자인',
      itemName: '앱 개발 해주실 분',
      part: '디자이너',
    },
    {
      id: 2,
      status: '거절됨',
      statusType: 'reject',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '요청 과제',
      category: '디자인',
      itemName: '앱 개발 해주실 분',
      part: '디자이너',
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
