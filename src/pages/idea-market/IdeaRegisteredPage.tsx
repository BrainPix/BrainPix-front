import ProfileHeader from '../../components/registeredPage/ProfileHeader';
import PostTitlePay from '../../components/registeredPage/PostTitlePay';
import IdeaDescription from '../../components/registeredPage/IdeaDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './ideaRegisteredPage.module.scss';

export const IdeaRegisteredPage = () => {
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader />
        <PostTitlePay />
        <IdeaDescription />
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};
