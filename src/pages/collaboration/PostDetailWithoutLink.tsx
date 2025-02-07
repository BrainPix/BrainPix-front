import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostHeader from '../../components/postdetail/PostHeader';
import TaskDescription from '../../components/postdetail/TaskDescription';
import RecruitmentInfo from '../../components/postdetail/RecruitmentInfo';
import RecruitmentStatus from '../../components/postdetail/RecruitmentStatus';
import TeamBuildingButton from '../../components/postdetail/TeamBuildingButton';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './postDetailWithoutLink.module.scss';

export const PostDetailWithoutLink = () => {
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader />
        <PostHeader />
        <TaskDescription />
        <RecruitmentInfo />
        <RecruitmentStatus />
      </div>
      <div className={styles.buttonMargin}>
        <TeamBuildingButton />
      </div>
      <div className={styles.margin}>
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};
