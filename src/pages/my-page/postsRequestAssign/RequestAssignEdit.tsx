import { PostFormContent } from '../../../components/my-page/PostFormContent';
import { PostFormAuthor } from '../../../components/my-page/PostFormAuthor';
import { PostFormRequestTitle } from '../../../components/my-page/PostFormRequestTitle';
import { PostFormRecruitmentInfo } from '../../../components/my-page/PostFormRecruitmentInfo';
import QnASection from '../../../components/postdetail/QnASection';
//import AuthorInfo from '../../../components/postdetail/AuthorInfo';

export const RequestAssignEdit = () => {
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
  return (
    <div>
      {/* 게시물 작성자, 게시물 정보 */}
      <PostFormAuthor
        userName={USER_DATA.userName}
        profileImage={USER_DATA.profileImage}
      />
      <PostFormRequestTitle />

      {/* 과제 설명, 첨부파일 */}
      <PostFormContent
        descriptionTitle={FORM_DATA.descriptionTitle}
        description={FORM_DATA.description}
        attachmentTitle={FORM_DATA.attachmentTitle}
        attachmentFileName={FORM_DATA.attachmentFileName}
      />

      {/* 모집 정보 */}
      <PostFormRecruitmentInfo />

      {/* 담당자 Q&A */}
      <QnASection />

      {/* 작성자 정보 */}
      {/*<AuthorInfo />*/}
    </div>
  );
};
