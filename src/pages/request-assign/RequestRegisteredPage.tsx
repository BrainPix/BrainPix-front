import ProfileHeader from '../../components/registeredPage/ProfileHeader';
import PostTitleApply from '../../components/registeredPage/PostTitleApply';
import AssignmentDescription from '../../components/registeredPage/AssignmentDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './requestRegisteredPage.module.scss';

export const RequestRegisteredPage = () => {
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader />
        <PostTitleApply />
        <AssignmentDescription />
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};
