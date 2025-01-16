import React from 'react';
import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostHeader from '../../components/postdetail/PostHeader';
import TaskDescription from '../../components/postdetail/TaskDescription';
import RecruitmentInfo from '../../components/postdetail/RecruitmentInfo';
import RecruitmentStatus from '../../components/postdetail/RecruitmentStatus';
import TeamBuildingButton from '../../components/postdetail/TeamBuildingButton';
import styles from './PostDetailWithoutLink.module.scss';

const PostDetailWithoutLink: React.FC = () => {
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
        <div className={styles.button}>
          <TeamBuildingButton />
        </div>
      </div>
    </>
  );
};

export default PostDetailWithoutLink;
