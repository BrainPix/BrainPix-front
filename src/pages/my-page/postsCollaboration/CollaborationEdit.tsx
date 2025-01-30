import { PostFormAuthor } from '../../../components/my/PostFormAuthor';
import PostHeader from '../../../components/postdetail/PostHeader';
import WebLinkBox from '../../../components/postdetail/WebLinkBox';
import TaskDescription from '../../../components/postdetail/TaskDescription';
import RecruitmentInfo from '../../../components/postdetail/RecruitmentInfo';
import RecruitmentStatus from '../../../components/postdetail/RecruitmentStatus';
import TeamBuildingButton from '../../../components/postdetail/TeamBuildingButton';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';
import styles from '../../../pages/collaboration/postDetailWithLink.module.scss';

export const CollaborationEdit = () => {
  const USER_DATA = {
    userName: 'SY TECH',
    profileImage: null,
  };
  return (
    <>
      <div className={styles.margin}>
        {/* 게시물 작성자 */}
        <PostFormAuthor
          userName={USER_DATA.userName}
          profileImage={USER_DATA.profileImage}
        />
        {/* 게시물 제목, 게시물 정보 */}
        <PostHeader />
        <WebLinkBox />
        {/* 과제 설명, 첨부파일 */}
        <TaskDescription />
        <RecruitmentInfo />
        <RecruitmentStatus />
      </div>
      <div className={styles.buttonMargin}>
        <div className={styles.button}>
          <TeamBuildingButton />
        </div>
      </div>
      <div className={styles.margin}>
        {/* 담당자 Q&A, 작성자 정보 */}
        <QnASection />
        <AuthorInfo />
      </div>
    </>
  );
};
