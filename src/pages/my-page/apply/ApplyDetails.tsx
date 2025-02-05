import styles from './applyDetails.module.scss';
import Label from '../../../components/common/label/Label';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { ApplyDetailsInfo } from '../../../components/my-page/apply/ApplyDetailsInfo';

export const ApplyDetails = () => {
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
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>지원 내역</span>
      </div>
      {APPLY_DATA.map((apply) => (
        <div
          key={apply.id}
          className={styles.applyCard}>
          <div className={styles.cardHeaderContainer}>
            <Label
              text={apply.status}
              type={apply.statusType}
            />
            <CardHeader date={apply.date} />
          </div>

          <PostAuthorInfo seller={apply.seller} />

          <ApplyDetailsInfo
            tab={apply.tab}
            category={apply.category}
            itemName={apply.itemName}
            price={apply.price}
          />
        </div>
      ))}
    </div>
  );
};
