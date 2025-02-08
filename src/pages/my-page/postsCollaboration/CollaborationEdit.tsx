import { PostFormAuthor } from '../../../components/my-page/PostFormAuthor';
import { CollaboPostHeader } from '../../../components/my-page/CollaboPostHeader';
import WebLinkBox from '../../../components/postdetail/WebLinkBox';
import { PostFormContent } from '../../../components/my-page/PostFormContent';
import RecruitmentInfo from '../../../components/postdetail/RecruitmentInfo';
import RecruitmentStatus from '../../../components/postdetail/RecruitmentStatus';
import TeamBuildingButton from '../../../components/postdetail/TeamBuildingButton';
import QnASection from '../../../components/postdetail/QnASection';
//import AuthorInfo from '../../../components/postdetail/AuthorInfo';
import styles from '../../../pages/collaboration/postDetailWithLink.module.scss';

export const CollaborationEdit = () => {
  const FORM_DATA = {
    descriptionTitle: '과제 설명',
    description: '과제 설명입니다...',
    attachmentTitle: '첨부파일',
    attachmentFileName: '첨부파일입니다... .pdf',
  };
  const USER_DATA = {
    userName: 'SY TECH',
    profileImage: null,
  };
  const POST_DATA = {
    postId: 3,
    tab: '협업 광장',
    category: '디자인',
    title: 'Web 서비스 제안',
    date: '2024/12/28',
    deadLine: 21,
    viewCount: 120,
    saveCount: 12,
    //webLink: 'https://www.sytech.com',
  };

  return (
    <>
      <div className={styles.margin}>
        {/* 게시물 작성자 */}
        <PostFormAuthor
          userName={USER_DATA.userName}
          profileImage={USER_DATA.profileImage}
          postId={POST_DATA.postId}
          editPath='/my/posts/collaboration/register'
        />
        {/* 게시물 제목, 게시물 정보 */}
        <CollaboPostHeader
          tab={POST_DATA.tab}
          category={POST_DATA.category}
          title={POST_DATA.title}
          date={POST_DATA.date}
          deadline={POST_DATA.deadLine}
          viewCount={POST_DATA.viewCount}
          saveCount={POST_DATA.saveCount}
          //webLink={POST_DATA.webLink}
        />
        <WebLinkBox />
        {/* 과제 설명, 첨부파일 */}
        <PostFormContent
          descriptionTitle={FORM_DATA.descriptionTitle}
          description={FORM_DATA.description}
          attachmentTitle={FORM_DATA.attachmentTitle}
          attachmentFileName={FORM_DATA.attachmentFileName}
        />
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
        {/*<AuthorInfo />*/}
      </div>
    </>
  );
};
