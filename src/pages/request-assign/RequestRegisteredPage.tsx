import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostTitle from '../../components/registeredPage/PostTitle';
import AssignmentDescription from '../../components/registeredPage/AssignmentDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './RequestRegisteredPage.module.scss';

const RequestRegisteredPage = () => {
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader />
        <PostTitle />
        <AssignmentDescription />
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};

export default RequestRegisteredPage;
