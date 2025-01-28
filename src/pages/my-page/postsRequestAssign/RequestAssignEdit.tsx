import { PostForm } from '../../../components/my/PostFormContent';
import { PostFormAuthor } from '../../../components/my/PostFormAuthor';
import { PostFormTitle } from '../../../components/my/PostFormTitle';
import { PostFormRecruitmentInfo } from '../../../components/my/PostFormRecruitmentInfo';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';

export const RequestAssignEdit = () => {
  return (
    <div>
      {/* 게시물 작성자, 게시물 정보 */}
      <PostFormAuthor />
      <PostFormTitle />

      {/* 과제 설명, 첨부파일 */}
      <PostForm />

      {/* 모집 정보 */}
      <PostFormRecruitmentInfo />

      {/* 담당자 Q&A */}
      <QnASection />

      {/* 작성자 정보 */}
      <AuthorInfo />
    </div>
  );
};
