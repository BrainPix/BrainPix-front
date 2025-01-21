import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostTitle from '../../components/registeredPage/PostTitle';
import IdeaDescription from '../../components/registeredPage/IdeaDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './ideaRegisteredPage.module.scss';

const IdeaRegisteredPage = () => {
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader />
        <PostTitle />
        <IdeaDescription />
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};

export default IdeaRegisteredPage;
