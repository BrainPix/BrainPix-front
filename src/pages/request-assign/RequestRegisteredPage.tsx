import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostTitleApply from '../../components/registeredPage/PostTitleApply';
import AssignmentDescription from '../../components/registeredPage/AssignmentDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './requestRegisteredPage.module.scss';

const RequestRegisteredPage = () => {
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

export default RequestRegisteredPage;
